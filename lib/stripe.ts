import Stripe from 'stripe';

let stripe: Stripe;

export function getStripe() {
  if (!stripe) {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    stripe = new Stripe(stripeKey, {
      apiVersion: '2026-02-25.clover' as any,
    });
  }
  return stripe;
}
