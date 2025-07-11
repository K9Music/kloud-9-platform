import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function PATCH(req, { params }) {
  try {
    const id = parseInt(params.id, 10);
    const data = await req.json();
    const { currentPassword, newPassword } = data;
    if (!currentPassword || !newPassword) {
      return new Response(JSON.stringify({ error: 'Current and new password are required.' }), { status: 400 });
    }
    // Fetch user
    const profile = await prisma.profile.findUnique({ where: { id } });
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
    await prisma.profile.update({ where: { id }, data: { password: hashed } });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Password change error:', err);
    return new Response(JSON.stringify({ error: 'Server error.' }), { status: 500 });
  }
} 