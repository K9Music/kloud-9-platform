import dbConnect from '../../../../lib/mongodb.js';
import Profile from '../../../../models/Profile.js';
import bcrypt from 'bcryptjs';
import { sanitizeObject, isValidProfileInput } from '../../../../lib/validation';

export async function GET(req, context) {
  await dbConnect();
  const params = await context.params;
  try {
    const id = params.id;
    let profile;
    
    // Check if it's a MongoDB ObjectId (24 character hex string)
    if (/^[0-9a-fA-F]{24}$/.test(id)) {
      profile = await Profile.findById(id);
    } else {
      // If not an ObjectId, treat as username
      profile = await Profile.findOne({ username: id.toLowerCase() });
    }
    
    if (!profile) {
      return new Response(JSON.stringify(null), { status: 200 });
    }
    
    const profileData = profile.toObject();
    delete profileData.password;
    return new Response(JSON.stringify(profileData), { status: 200 });
  } catch (err) {
    console.error('GET error:', err);
    return new Response(JSON.stringify({ error: 'Server error.' }), { status: 500 });
  }
}

export async function PATCH(req, context) {
  await dbConnect();
  const params = await context.params;
  try {
    const id = params.id;
    let data = await req.json();
    data = sanitizeObject(data); // Sanitize all string fields
    if (!isValidProfileInput(data)) {
      return new Response(JSON.stringify({ error: 'Invalid input.' }), { status: 400 });
    }
    // Only allow editable fields
    const update = {};
    if (data.username !== undefined) {
      // Fetch current profile
      const currentProfile = await Profile.findById(id);
      if (!currentProfile) {
        return new Response(JSON.stringify({ error: 'Profile not found.' }), { status: 404 });
      }
      if (data.username !== currentProfile.username) {
        // Enforce cooldown (default 90 days)
        const cooldown = currentProfile.usernameChangeCooldown || 90 * 24 * 60 * 60 * 1000;
        const lastChange = currentProfile.lastUsernameChange ? new Date(currentProfile.lastUsernameChange).getTime() : 0;
        const now = Date.now();
        if (now - lastChange < cooldown) {
          return new Response(JSON.stringify({ error: 'You cannot change your username yet.' }), { status: 403 });
        }
        // Check uniqueness
        const existing = await Profile.findOne({ username: data.username });
        if (existing) {
          return new Response(JSON.stringify({ error: 'Username already exists.' }), { status: 409 });
        }
        update.username = data.username;
        update.lastUsernameChange = new Date();
      }
    }
    if (data.name !== undefined) update.name = data.name;
    if (data.bio !== undefined) update.bio = data.bio;
    if (data.photoUrl !== undefined) update.photoUrl = data.photoUrl;
    if (data.bannerUrl !== undefined) update.bannerUrl = data.bannerUrl;
    if (data.showcase !== undefined) update.showcase = data.showcase;
    if (data.genre !== undefined) update.genre = data.genre;
    if (data.stageName !== undefined) update.stageName = data.stageName;
    if (data.producerTag !== undefined) update.producerTag = data.producerTag;
    if (data.engineerTag !== undefined) update.engineerTag = data.engineerTag;
    if (data.directedBy !== undefined) update.directedBy = data.directedBy;
    if (data.designerStyle !== undefined) update.designerStyle = data.designerStyle;
    if (data.skitmakerName !== undefined) update.skitmakerName = data.skitmakerName;
    if (data.vixenName !== undefined) update.vixenName = data.vixenName;
    // Never allow email or artType changes here
    const profile = await Profile.findByIdAndUpdate(id, update, { new: true });
    if (!profile) {
      return new Response(JSON.stringify({ error: 'Profile not found.' }), { status: 404 });
    }
    const profileData = profile.toObject();
    delete profileData.password;
    return new Response(JSON.stringify(profileData), { status: 200 });
  } catch (err) {
    console.error('PATCH error:', err);
    return new Response(JSON.stringify({ error: 'Server error.' }), { status: 500 });
  }
} 