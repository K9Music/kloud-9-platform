import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email transporter configuration (same as feedback route)
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Function to send contact email
async function sendContactEmail(contactData) {
  const { name, email, message } = contactData;
  
  // Format the email content
  const emailSubject = `📧 Kloud-9 Contact: ${name}`;
  
  const emailBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
      <div style="background: linear-gradient(135deg, #0f172a, #0e7490); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">📧 Kloud-9 Platform Contact</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">New contact form submission received</p>
      </div>
      
      <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="margin-bottom: 20px;">
          <h2 style="color: #0e7490; margin: 0 0 10px 0; font-size: 20px;">👤 Contact Information</h2>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #0e7490;">
            <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0e7490;">${email}</a></p>
            <p style="margin: 0 0 10px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #0e7490; margin: 0 0 10px 0; font-size: 16px;">💬 Message</h3>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
            <div style="background: white; padding: 12px; border-radius: 6px; border: 1px solid #e9ecef; font-style: italic; color: #495057; line-height: 1.6;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
          <p style="color: #6c757d; margin: 0; font-size: 14px;">
            This contact form was submitted from the Kloud-9 Platform website.
          </p>
          <p style="color: #6c757d; margin: 10px 0 0 0; font-size: 14px;">
            You can reply directly to this email to respond to ${name}.
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
    replyTo: email
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending contact email:', error);
    return false;
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Prepare contact data
    const contactData = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim()
    };

    // Log the contact submission
    console.log('Contact form submitted:', contactData);

    // Send email notification
    const emailSent = await sendContactEmail(contactData);

    if (!emailSent) {
      console.warn('Failed to send contact email, but submission was logged');
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Message sent successfully! We\'ll get back to you soon.',
        emailSent: true
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
