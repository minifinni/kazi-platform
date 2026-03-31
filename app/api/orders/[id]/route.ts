import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const VALID_TRANSITIONS: Record<string, string[]> = {
  ordered: ['cutting'],
  cutting: ['sewing'],
  sewing: ['printing'],
  printing: ['qc'],
  qc: ['shipping'],
  shipping: ['delivered'],
  delivered: [],
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const email = request.nextUrl.searchParams.get('email');

    const supabase = await createClient();

    const { data: order, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // If email is provided, validate it matches
    if (email && order.customer_email !== email) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, note } = body;

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Check auth and role
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get current order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('status')
      .eq('id', id)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Validate transition
    if (!VALID_TRANSITIONS[order.status]?.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status transition from ${order.status} to ${status}` },
        { status: 400 }
      );
    }

    // Update order status
    const { data: updatedOrder, error: updateError } = await supabase
      .from('orders')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update order' },
        { status: 500 }
      );
    }

    // Create order update record
    const { error: updateLogError } = await supabase
      .from('order_updates')
      .insert({
        order_id: id,
        status,
        note: note || null,
        updated_by: user.id,
      });

    if (updateLogError) {
      console.error('Failed to log order update:', updateLogError);
    }

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Update order error:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}
