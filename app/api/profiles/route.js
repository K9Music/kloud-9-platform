import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { sanitizeObject, isValidProfileInput } from '../../../lib/validation';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    let data = await req.json();
    data = sanitizeObject(data); // Sanitize all string fields
    if (!isValidProfileInput(data)) {
      return new Response(JSON.stringify({ error: 'Invalid input.' }), { status: 400 });
    }

    // Basic validation (add more as needed)
    if (!data.username || !data.name || !data.email || !data.password) {
      return new Response(JSON.stringify({ error: 'Missing required fields.' }), { status: 400 });
    }

    // Check for existing user
    const existing = await prisma.profile.findUnique({ where: { username: data.username.toLowerCase() } });
    if (existing) {
      return new Response(JSON.stringify({ error: 'Username already exists.' }), { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Save profile
    const profile = await prisma.profile.create({
      data: {
        ...data,
        username: data.username.toLowerCase(),
        password: hashedPassword,
      },
    });
    const { password, ...profileData } = profile;
    return new Response(JSON.stringify(profileData), { status: 201 });
  } catch (err) {
    console.error('API error:', err);
    return new Response(JSON.stringify({ error: 'Server error.' }), { status: 500 });
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const username = searchParams.get('username');
  try {
    let profile;
    if (email) {
      profile = await prisma.profile.findUnique({ where: { email } });
    } else if (username) {
      profile = await prisma.profile.findUnique({ where: { username } });
    } else {
      return new Response(JSON.stringify({ error: 'Missing email or username parameter.' }), { status: 400 });
    }
    if (!profile) {
      return new Response(JSON.stringify(null), { status: 404 });
    }
    // Never send password
    const { password, ...profileData } = profile;
    return new Response(JSON.stringify(profileData), { status: 200 });
  } catch (err) {
    console.error('API error:', err);
    return new Response(JSON.stringify({ error: 'Server error.' }), { status: 500 });
  }
}