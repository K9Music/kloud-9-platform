import { NextResponse } from 'next/server';
import { subscribeToEmailOctopusWithList } from '../../../lib/emailoctopus';

export async function POST(req) {
  try {
    const { email, firstName, lastName } = await req.json();
    if (!email || !firstName) {
      return NextResponse.json({ error: 'Email and first name are required' }, { status: 400 });
    }

    const listId = process.env.EMAILOCTOPUS_NEWSLETTER_LIST_ID || process.env.EMAILOCTOPUS_LIST_ID;

    const result = await subscribeToEmailOctopusWithList(listId, {
      email,
      firstName,
      lastName,
      tags: ['newsletter', 'site-footer'],
    });

    if (!result.ok && !result.skipped) {
      return NextResponse.json({ error: 'Failed to subscribe. Please try again later.' }, { status: 502 });
    }

    return NextResponse.json({ message: 'Subscribed! Check your email.' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


