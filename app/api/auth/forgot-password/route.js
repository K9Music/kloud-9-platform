import dbConnect from '../../../../lib/mongodb.js';
import Profile from '../../../../models/Profile.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Function to send password reset email
async function sendPasswordResetEmail(user, resetUrl) {
  const firstName = user.name ? user.name.split(' ')[0] : user.username;
  
  const emailSubject = `🔐 Kloud-9 Password Reset Request`;
  
  const emailBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #0f172a, #0e7490); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🎵 Kloud-9 Platform</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Password Reset Request</p>
      </div>
      
      <!-- Main Content -->
      <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #0e7490; margin: 0 0 15px 0; font-size: 20px;">Hello ${firstName}!</h2>
        
        <p style="color: #495057; line-height: 1.6; margin-bottom: 20px;">
          We received a request to reset the password for your Kloud-9 Platform account. 
          If you made this request, please click the button below to reset your password.
        </p>
        
        <!-- Primary Action Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="display: inline-block; background: linear-gradient(135deg, #0e7490, #0891b2); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(14, 116, 144, 0.3);">
            🔐 Reset My Password
          </a>
        </div>
        
        <!-- Fallback Link -->
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0e7490;">
          <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 14px; font-weight: bold;">
            Button not working? Copy and paste this link into your browser:
          </p>
          <p style="margin: 0; word-break: break-all; font-family: monospace; font-size: 12px; color: #0e7490;">
            ${resetUrl}
          </p>
        </div>
        
        <!-- Security Notice -->
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #856404; margin: 0 0 10px 0; font-size: 16px;">⚠️ Security Notice</h3>
          <ul style="color: #856404; margin: 0; padding-left: 20px; line-height: 1.5;">
            <li>This link will expire in <strong>1 hour</strong></li>
            <li>If you didn't request this password reset, please ignore this email</li>
            <li>Your password will remain unchanged until you click the link above</li>
          </ul>
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
          <p style="color: #6c757d; margin: 0; font-size: 14px;">
            This email was sent from the Kloud-9 Platform password reset system.
          </p>
          <p style="color: #6c757d; margin: 10px 0 0 0; font-size: 14px;">
            Need help? Contact us at <a href="mailto:kloud9@k9music.com" style="color: #0e7490;">kloud9@k9music.com</a>
          </p>
        </div>
      </div>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: emailSubject,
    html: emailBody
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully to:', user.email);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const { email } = await req.json();
    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required.' }), { status: 400 });
    }
    const user = await Profile.findOne({ email });
    if (!user) {
      // Always respond with success to prevent email enumeration
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
    
    // Generate token
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
    
    // Store token and expiry on user
    user.resetToken = token;
    user.resetTokenExpiry = expires;
    await user.save();
    
    // Create reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
    
    // Send password reset email
    const emailSent = await sendPasswordResetEmail(user, resetUrl);
    
    if (!emailSent) {
      console.warn('Failed to send password reset email, but token was generated');
      // Still return success to prevent email enumeration
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Forgot password error:', err);
    return new Response(JSON.stringify({ error: 'Server error.' }), { status: 500 });
  }
} 