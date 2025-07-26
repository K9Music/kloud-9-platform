import dbConnect from '../../../../../lib/mongodb.js';
import Profile from '../../../../../models/Profile.js';
import bcrypt from 'bcryptjs';

export async function PATCH(req, context) {
  await dbConnect();
  const params = await context.params;
  try {
    const id = params.id;
    const data = await req.json();
    const { currentPassword, newPassword } = data;
    if (!currentPassword || !newPassword) {
      return new Response(JSON.stringify({ error: 'Current and new password are required.' }), { status: 400 });
    }
    // Fetch user
    const profile = await Profile.findById(id);
    if (!profile) {
      return new Response(JSON.stringify({ error: 'Profile not found.' }), { status: 404 });
    }
    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, profile.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: 'Current password is incorrect.' }), { status: 401 });
    }
    // Hash and update new password
    const hashed = await bcrypt.hash(newPassword, 10);
    profile.password = hashed;
    await profile.save();
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Password change error:', err);
    return new Response(JSON.stringify({ error: 'Server error.' }), { status: 500 });
  }
} 