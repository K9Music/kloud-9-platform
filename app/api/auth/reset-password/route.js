import dbConnect from '../../../../lib/mongodb.js';
import Profile from '../../../../models/Profile.js';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  await dbConnect();
  try {
    const { token, newPassword } = await req.json();
    if (!token || !newPassword) {
      return new Response(JSON.stringify({ error: 'Missing token or password.' }), { status: 400 });
    }
    const user = await Profile.findOne({ resetToken: token });
    if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      return new Response(JSON.stringify({ error: 'Invalid or expired token.' }), { status: 400 });
    }
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Reset password error:', err);
    return new Response(JSON.stringify({ error: 'Server error.' }), { status: 500 });
  }
} 