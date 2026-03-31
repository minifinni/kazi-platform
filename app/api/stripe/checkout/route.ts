import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productType, quantity, email, name, notes } = body;

    // Validate input
    if (!productType || !quantity || !email || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (quantity < 50) {
      return NextResponse.json(
        { error: 'Minimum order quantity is 50' },
        { status: 400 }
      );
    }

    // Get pricing from Supabase
    const supabase = await createClient();
    const { data: pricingTiers } = await supabase
      .from('pricing_tiers')
      .select('*')
      .eq('product_type', productType)
      .gte('min_qty', quantity)
      .lte('max_qty', quantity);

    if (!pricingTiers || pricingTiers.length === 0) {
      return NextResponse.json(
        { error: 'Pricing not available for selected options' },
        { status: 400 }
      );
    }

    const unitPrice = pricingTiers[0].price_per_unit;
    const totalPrice = unitPrice * quantity;

    // Create Stripe session
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'] as any,
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: `${productType.charAt(0).toUpperCase() + productType.slice(1)} x${quantity}`,
              description: notes || 'Custom order',
            },
            unit_amount: Math.round(totalPrice * 100), // in pence
          },
          quantity: 1,
        } as any,
      ] as any,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tracking?order_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      customer_email: email,
      metadata: {
        productType,
        quantity,
        email,
        name,
        notes,
      },
    } as any);

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
