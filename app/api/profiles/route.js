import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const data = await req.json();

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
        username: data.username.toLowerCase(),
        name: data.name,
        stageName: data.stageName,
        genre: data.genre,
        style: data.style,
        bio: data.bio,
        photoUrl: data.photoUrl,
        bannerUrl: data.bannerUrl,
        artType: data.artType,
        showcase: data.showcase,
        email: data.email,
        password: hashedPassword, // Store hashed password
        producerTag: data.producerTag,
        engineerTag: data.engineerTag,
        directedBy: data.directedBy,
        designerStyle: data.designerStyle,
        skitmakerName: data.skitmakerName,
        vixenName: data.vixenName,
      },
    });

    return new Response(JSON.stringify(profile), { status: 201 });
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