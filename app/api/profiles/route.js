import dbConnect from '../../../lib/mongodb.js';
import Profile from '../../../models/Profile.js';
import bcrypt from 'bcryptjs';
import { sanitizeObject, isValidProfileInput } from '../../../lib/validation';

export async function POST(req) {
  await dbConnect();
  try {
    let data = await req.json();
    data = sanitizeObject(data); // Sanitize all string fields
    if (!isValidProfileInput(data)) {
      return new Response(JSON.stringify({ error: 'Invalid input.' }), { status: 400 });
    }
    if (!data.username || !data.name || !data.email || !data.password) {
      return new Response(JSON.stringify({ error: 'Missing required fields.' }), { status: 400 });
    }
    // Check for existing user
    const existing = await Profile.findOne({ username: data.username.toLowerCase() });
    if (existing) {
      return new Response(JSON.stringify({ error: 'Username already exists.' }), { status: 409 });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    // Save profile
    const profile = await Profile.create({
      ...data,
      username: data.username.toLowerCase(),
      password: hashedPassword,
    });
    const profileData = profile.toObject();
    delete profileData.password;
    return new Response(JSON.stringify(profileData), { status: 201 });
  } catch (err) {
    console.error('API error:', err);
    return new Response(JSON.stringify({ error: 'Server error.' }), { status: 500 });
  }
}

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const username = searchParams.get('username');
  try {
    let profile;
    if (email) {
      profile = await Profile.findOne({ email });
    } else if (username) {
      profile = await Profile.findOne({ username });
    } else {
      return new Response(JSON.stringify({ error: 'Missing email or username parameter.' }), { status: 400 });
    }
    if (!profile) {
      return new Response(JSON.stringify(null), { status: 404 });
    }
    const profileData = profile.toObject();
    delete profileData.password;
    return new Response(JSON.stringify(profileData), { status: 200 });
  } catch (err) {
    console.error('API error:', err);
    return new Response(JSON.stringify({ error: 'Server error.' }), { status: 500 });
  }
}