import dbConnect from '../../../../lib/mongodb.js';
import Profile from '../../../../models/Profile.js';
import crypto from 'crypto';

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
    // Log reset link (replace with email sending in production)
    const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
    console.log('Password reset link:', resetUrl);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Forgot password error:', err);
    return new Response(JSON.stringify({ error: 'Server error.' }), { status: 500 });
  }
} 