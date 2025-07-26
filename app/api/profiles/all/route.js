import dbConnect from '../../../../lib/mongodb.js';
import Profile from '../../../../models/Profile.js';

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const artType = searchParams.get('artType');
  const search = searchParams.get('search');
  const filter = {};
  if (artType) filter.artType = artType;
  if (search) {
    filter.$or = [
      { username: { $regex: search, $options: 'i' } },
      { name: { $regex: search, $options: 'i' } },
      { bio: { $regex: search, $options: 'i' } },
    ];
  }
  try {
    const profiles = await Profile.find(filter, {
      username: 1,
      name: 1,
      artType: 1,
      bio: 1,
      photoUrl: 1,
      bannerUrl: 1,
      genre: 1,
      stageName: 1,
      showcase: 1,
      _id: 0,
    }).sort({ name: 1 });
    return new Response(JSON.stringify(profiles), { status: 200 });
  } catch (err) {
    console.error('Profiles all API error:', err);
    return new Response(JSON.stringify({ error: 'Server error.' }), { status: 500 });
  }
}