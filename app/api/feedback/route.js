import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // Your Zoho email address
    pass: process.env.EMAIL_PASS  // Your Zoho app password
  }
});

// Function to send feedback email
async function sendFeedbackEmail(feedbackData) {
  const { type, message, email, rating, timestamp, userAgent, url } = feedbackData;
  
  // Format the email content
  const emailSubject = `🎵 Kloud-9 Feedback: ${type}`;
  
  const emailBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
      <div style="background: linear-gradient(135deg, #0f172a, #0e7490); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🎵 Kloud-9 Platform Feedback</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">New feedback received from your platform</p>
      </div>
      
      <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="margin-bottom: 20px;">
          <h2 style="color: #0e7490; margin: 0 0 10px 0; font-size: 20px;">📋 Feedback Details</h2>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #0e7490;">
            <p style="margin: 0 0 10px 0;"><strong>Type:</strong> <span style="background: #0e7490; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${type}</span></p>
            ${rating ? `<p style="margin: 0 0 10px 0;"><strong>Rating:</strong> ${'⭐'.repeat(rating)} (${rating}/5)</p>` : ''}
            <p style="margin: 0 0 10px 0;"><strong>Message:</strong></p>
            <div style="background: white; padding: 12px; border-radius: 6px; border: 1px solid #e9ecef; font-style: italic; color: #495057;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #0e7490; margin: 0 0 10px 0; font-size: 16px;">👤 User Information</h3>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
            ${email ? `<p style="margin: 0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0e7490;">${email}</a></p>` : ''}
            <p style="margin: 0 0 8px 0;"><strong>Submitted:</strong> ${new Date(timestamp).toLocaleString()}</p>
            <p style="margin: 0 0 8px 0;"><strong>Page URL:</strong> <a href="${url}" style="color: #0e7490;">${url}</a></p>
          </div>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #0e7490; margin: 0 0 10px 0; font-size: 16px;">🔧 Technical Details</h3>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; font-family: monospace; font-size: 12px; color: #6c757d; word-break: break-all;">
            <strong>User Agent:</strong><br>
            ${userAgent}
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
          <p style="color: #6c757d; margin: 0; font-size: 14px;">
            This feedback was automatically sent from the Kloud-9 Platform feedback system.
          </p>
        </div>
      </div>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'kloud9@k9music.com',
    subject: emailSubject,
    html: emailBody,
    replyTo: email || process.env.EMAIL_USER
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Feedback email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending feedback email:', error);
    return false;
  }
}

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

    // Prepare feedback data
    const feedbackData = {
      type,
      message,
      email,
      rating,
      timestamp: timestamp || new Date().toISOString(),
      userAgent: userAgent || 'Unknown',
      url: url || 'Unknown'
    };

    // Log the feedback
    console.log('Feedback received:', feedbackData);

    // Send email notification
    const emailSent = await sendFeedbackEmail(feedbackData);

    if (!emailSent) {
      console.warn('Failed to send feedback email, but feedback was logged');
    }

    return NextResponse.json(
      { 
        message: 'Feedback submitted successfully',
        emailSent: emailSent
      },
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