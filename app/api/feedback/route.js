import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, message, email, rating, timestamp, userAgent, url } = body;

    // Validate required fields
    if (!type || !message) {
      return NextResponse.json(
        { error: 'Type and message are required' },
        { status: 400 }
      );
    }

    // Here you can implement your feedback storage logic:
    // 1. Save to database
    // 2. Send email notification
    // 3. Send to external service (e.g., Intercom, Zendesk)
    // 4. Log to monitoring service

    // For now, we'll just log it and return success
    console.log('Feedback received:', {
      type,
      message,
      email,
      rating,
      timestamp,
      userAgent,
      url,
    });

    // TODO: Implement actual storage/notification logic
    // Example: Send email to your team
    // await sendFeedbackEmail({ type, message, email, rating, timestamp, userAgent, url });

    return NextResponse.json(
      { message: 'Feedback submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing feedback:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 