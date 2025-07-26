import dbConnect from '../../../../../lib/mongodb.js';
import Profile from '../../../../../models/Profile.js';

export async function GET(req, context) {
  await dbConnect();
  const params = await context.params;
  try {
    const { username } = params;
    console.log('API: Fetching profile for username:', username);
    
    const profile = await Profile.findOne({ username: username.toLowerCase() });
    
    if (!profile) {
      console.log('API: Profile not found for username:', username);
      return new Response(JSON.stringify(null), { status: 200 });
    }
    
    const profileData = profile.toObject();
    delete profileData.password;
    console.log('API: Profile found:', profileData.username);
    return new Response(JSON.stringify(profileData), { status: 200 });
  } catch (err) {
    console.error('API GET error:', err);
    return new Response(JSON.stringify({ error: 'Server error.' }), { status: 500 });
  }
} 