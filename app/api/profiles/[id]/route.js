import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function PATCH(req, context) {
  const { params } = await context;
  try {
    const id = parseInt(params.id, 10);
    const data = await req.json();
    // Only allow editable fields
    const update = {};
    // Username change logic
    if (data.username !== undefined) {
      // Fetch current profile
      const currentProfile = await prisma.profile.findUnique({ where: { id } });
      if (!currentProfile) {
        return new Response(JSON.stringify({ error: 'Profile not found.' }), { status: 404 });
      }
      // Prevent changing to the same username
      if (data.username !== currentProfile.username) {
        // Enforce cooldown (default 90 days)
        const cooldown = currentProfile.usernameChangeCooldown || 90 * 24 * 60 * 60 * 1000;
        const lastChange = currentProfile.lastUsernameChange ? new Date(currentProfile.lastUsernameChange).getTime() : 0;
        const now = Date.now();
        if (now - lastChange < cooldown) {
          return new Response(JSON.stringify({ error: 'You cannot change your username yet.' }), { status: 403 });
        }
        // Check uniqueness
        const existing = await prisma.profile.findUnique({ where: { username: data.username } });
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
    const profile = await prisma.profile.update({
      where: { id },
      data: update,
    });
    const { password, ...profileData } = profile;
    return new Response(JSON.stringify(profileData), { status: 200 });
  } catch (err) {
    console.error('PATCH error:', err);
    return new Response(JSON.stringify({ error: 'Server error.' }), { status: 500 });
  }
} 