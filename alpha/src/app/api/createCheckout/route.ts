import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');
    const { items } = await request.json();

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Invalid items data' },
        { status: 400 }
      );
    }
    const session = await stripe.checkout.sessions.create({
      line_items: items.map(item => ({
        price_data: {
          currency: 'cad',
          product_data: {
            name: item.name,
            images: item.image ? [`https:${item.image}`] : undefined,
          },
          unit_amount: Math.round(item.price * 100), 
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart?canceled=true`,
    });
    if (session.url) {
      return NextResponse.json({ url: session.url });
    }

    return NextResponse.json(
      { error: 'Could not create checkout session' },
      { status: 500 }
    );
  } catch (err) {
    console.error('Stripe error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}