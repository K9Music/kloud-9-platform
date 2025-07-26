import dbConnect from '../../../../lib/mongodb.js';
import Profile from '../../../../models/Profile.js';

export async function GET(req) {
  await dbConnect();
  try {
    const profiles = await Profile.find({}, { username: 1, name: 1, email: 1, _id: 1 });
    console.log('Debug: Found profiles:', profiles);
    return new Response(JSON.stringify({ 
      count: profiles.length, 
      profiles: profiles.map(p => ({ 
        id: p._id, 
        username: p.username, 
        name: p.name, 
        email: p.email 
      }))
    }), { status: 200 });
  } catch (err) {
    console.error('Debug API error:', err);
    return new Response(JSON.stringify({ error: 'Server error.' }), { status: 500 });
  }
} 