import dbConnect from '../../../../lib/mongodb.js';
import Profile from '../../../../models/Profile.js';

export async function GET() {
  await dbConnect();
  try {
    // Fetch up to 7 creators for the carousel
    const creators = await Profile.find({}, {
      username: 1,
      name: 1,
      artType: 1,
      photoUrl: 1,
      stageName: 1,
      producerTag: 1,
      engineerTag: 1,
      directedBy: 1,
      designerStyle: 1,
      skitmakerName: 1,
      vixenName: 1,
      shotBy: 1,
      _id: 1,
    })
    .sort({ createdAt: -1 }) // Most recent first
    .limit(7);

    // Transform the data to include the appropriate display name
    const transformedCreators = creators.map(creator => {
      const creatorData = creator.toObject();
      
      // Determine the display name based on art type
      let displayName = creatorData.username; // Default to username
      
      switch (creatorData.artType) {
        case 'musician':
          if (creatorData.stageName) displayName = creatorData.stageName;
          break;
        case 'beat producer':
          if (creatorData.producerTag) displayName = creatorData.producerTag;
          break;
        case 'mixing/mastering engineer':
          if (creatorData.engineerTag) displayName = creatorData.engineerTag;
          break;
        case 'music video director':
        case 'movie director':
          if (creatorData.directedBy) displayName = creatorData.directedBy;
          break;
        case 'graphics designer':
          if (creatorData.designerStyle) displayName = creatorData.designerStyle;
          break;
        case 'skitmaker':
          if (creatorData.skitmakerName) displayName = creatorData.skitmakerName;
          break;
        case 'video vixen':
          if (creatorData.vixenName) displayName = creatorData.vixenName;
          break;
        case 'photographer':
          if (creatorData.shotBy) displayName = creatorData.shotBy;
          break;
        default:
          displayName = creatorData.username;
      }

      return {
        id: creatorData._id.toString(),
        name: creatorData.name,
        displayName: displayName,
        artType: creatorData.artType,
        img: creatorData.photoUrl || '/default-avatar.png',
        username: creatorData.username,
      };
    });

    return new Response(JSON.stringify(transformedCreators), { status: 200 });
  } catch (err) {
    console.error('Carousel API error:', err);
    return new Response(JSON.stringify({ error: 'Server error.' }), { status: 500 });
  }
} 