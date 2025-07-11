import { FaStar, FaSpotify, FaApple, FaYoutube, FaSoundcloud, FaTiktok, FaInstagram, FaBehance, FaDribbble, FaVimeo, FaImdb, FaLink, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { SiAudiomack, SiBeatstars, SiX, SiThreads } from 'react-icons/si';
import BioSection from './BioSection';
import ShowcaseEmbed from './ShowcaseEmbed';

const platformIcons = {
  spotify: <FaSpotify className="inline mr-2 text-green-500" />,
  appleMusic: <FaApple className="inline mr-2 text-gray-300" />,
  youtube: <FaYoutube className="inline mr-2 text-red-500" />,
  soundcloud: <FaSoundcloud className="inline mr-2 text-orange-400" />,
  audiomack: <SiAudiomack className="inline mr-2 text-yellow-400" />,
  tiktok: <FaTiktok className="inline mr-2 text-pink-500" />,
  beatstars: <SiBeatstars className="inline mr-2 text-red-700" />,
  behance: <FaBehance className="inline mr-2 text-blue-500" />,
  dribbble: <FaDribbble className="inline mr-2 text-pink-400" />,
  instagram: <FaInstagram className="inline mr-2 text-pink-600" />,
  portfolio: <FaLink className="inline mr-2 text-blue-400" />,
  vimeo: <FaVimeo className="inline mr-2 text-blue-300" />,
  imdb: <FaImdb className="inline mr-2 text-yellow-500" />,
};

async function getProfile(username) {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/profiles?username=${username}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
  return null;
  }
}

function toSentenceCase(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default async function PublicProfilePage(context) {
  const { params } = await context;
  if (!params || !params.username) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-orange-900 to-teal-900">
        <div className="text-orange-100 text-xl">404 — Profile not found</div>
      </div>
    );
  }
  const { username } = params;
  const profile = await getProfile(username);
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-orange-900 to-teal-900">
        <div className="text-orange-100 text-xl">404 — Profile not found</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-orange-900 to-teal-900 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      <div className="w-full max-w-5xl p-4 sm:p-8 bg-gray-900 rounded-lg shadow-lg text-orange-100">
        <div className="flex flex-col items-center mb-6">
          {profile.bannerUrl && (
            <img src={profile.bannerUrl} alt="Banner" className="w-full h-40 object-cover rounded-lg mb-4" />
          )}
          {profile.photoUrl && (
            <img src={profile.photoUrl} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-orange-400 -mt-16 mb-2 bg-gray-800" />
          )}
          <h2 className="text-3xl font-bold mt-2 mb-1">{profile.stageName || profile.name}</h2>
          <div className="text-orange-300 text-lg mb-1">@{profile.username}</div>
          <div className="text-orange-200 text-sm mb-2">{toSentenceCase(profile.artType)}</div>
          {profile.genre && (
            <div className="text-orange-200 text-sm mb-2">{profile.genre}</div>
          )}
        </div>
        {/* Social Sharing Buttons */}
        <div className="flex flex-col items-center gap-2 mb-6 animate-fade-in-slide-up" style={{ animationDelay: '60ms' }}>
          <span className="text-orange-200 text-sm font-semibold">Share to:</span>
          <div className="flex justify-center gap-4">
            {(() => {
              const profileUrl = `https://yourdomain.com/profile/${profile.username}`;
              const shareText = encodeURIComponent(`Check out ${profile.stageName || profile.name}'s profile on Kloud-9!`);
              return (
                <>
                  <a
                    href={`https://www.threads.net/intent/post?url=${encodeURIComponent(profileUrl)}&text=${shareText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Threads"
                    className="hover:text-orange-400 text-2xl transition"
                    style={{ color: '#5851DB' }}
                  >
                    <SiThreads />
                  </a>
                  <a
                    href={`https://x.com/intent/tweet?url=${encodeURIComponent(profileUrl)}&text=${shareText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on X"
                    className="hover:text-orange-400 text-2xl transition text-black dark:text-white"
                  >
                    <SiX />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                    className="hover:text-orange-400 text-2xl transition"
                    style={{ color: '#1877F3' }}
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(profileUrl)}&title=${shareText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    className="hover:text-orange-400 text-2xl transition"
                    style={{ color: '#0A66C2' }}
                  >
                    <FaLinkedin />
                  </a>
                </>
              );
            })()}
          </div>
        </div>
        {/* Rating Placeholder */}
        <div className="mb-4 flex items-center justify-center bg-gray-800 rounded-lg p-4">
          <FaStar className="text-yellow-400 text-2xl mr-2" />
          <span className="text-orange-100 font-semibold text-lg">Average Rating: 4.8/5.0</span>
          <span className="ml-2 text-orange-300 text-sm">(Ratings coming soon)</span>
        </div>
        {profile.bio && (
          <div className="mb-4">
            <div className="font-semibold mb-1">Bio</div>
            <BioSection bio={profile.bio} />
          </div>
        )}
        {/* Showcase section */}
        {profile.showcase && (
          <div className="mb-4 animate-fade-in-slide-up">
            <div className="font-semibold mb-2">Showcase</div>
            {/* Step 3: For each of the top 3 prioritized platforms, render a card with up to 3 links for that platform */}
            {(() => {
              // Music-related art types
              const musicTypes = [
                'musician',
                'beat producer',
                'songwriter',
                'mixing/mastering engineer',
              ];
              const musicPriority = ['spotify', 'appleMusic', 'youtube', 'audiomack'];
              // ART_TYPES mapping for other types
              const artTypeMap = {
                'graphics designer': ['behance', 'dribbble', 'instagram', 'portfolio'],
                'music video director': ['youtube', 'vimeo', 'instagram', 'tiktok'],
                'movie director': ['imdb', 'youtube', 'vimeo', 'portfolio'],
                'skitmaker': ['youtube', 'tiktok', 'instagram'],
                'video vixen': ['youtube', 'tiktok', 'instagram'],
                'other': ['custom1', 'custom2', 'custom3'],
              };
              const showcaseEntries = Object.entries(profile.showcase).filter(([k, v]) => typeof v === 'string' && v.startsWith('http'));
              // Group links by platform (removing trailing numbers)
              const platformGroups = {};
              for (const [k, v] of showcaseEntries) {
                const plat = k.replace(/\d+$/, '');
                if (!platformGroups[plat]) platformGroups[plat] = [];
                platformGroups[plat].push([k, v]);
              }
              // Determine prioritized platforms
              let prioritizedPlatforms = [];
              if (musicTypes.includes(profile.artType)) {
                prioritizedPlatforms = musicPriority.filter(plat => platformGroups[plat]);
              } else {
                const arr = artTypeMap[profile.artType] || [];
                prioritizedPlatforms = arr.filter(plat => platformGroups[plat]);
              }
              // Fill up to 3 with any other platforms
              const allPlatforms = Object.keys(platformGroups);
              for (const plat of allPlatforms) {
                if (prioritizedPlatforms.length === 3) break;
                if (!prioritizedPlatforms.includes(plat)) {
                  prioritizedPlatforms.push(plat);
                }
              }
              prioritizedPlatforms = prioritizedPlatforms.slice(0, 3);
              // Find all links not included in the prioritized platform cards
              const prioritizedSet = new Set();
              prioritizedPlatforms.forEach(plat => {
                platformGroups[plat].slice(0, 3).forEach(([k]) => prioritizedSet.add(k));
              });
              const otherLinks = showcaseEntries.filter(([k]) => !prioritizedSet.has(k));
              return (
                <>
                  <div className="flex flex-col gap-6 mb-6">
                    {prioritizedPlatforms.map(plat => (
                      <div key={plat} className="bg-gray-800 rounded-lg shadow p-2 sm:p-4">
                        <div className="font-semibold text-orange-200 mb-2 text-lg flex items-center flex-wrap">
                          {platformIcons[plat] || <FaLink className="inline mr-2 text-blue-400" />}
                          {plat.charAt(0).toUpperCase() + plat.slice(1)}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                          {platformGroups[plat].slice(0, 3).map(([k, v]) => (
                            <div key={k} className="w-full sm:w-1/3">
                              <ShowcaseEmbed platform={plat} link={v} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {otherLinks.length > 0 && (
                    <div className="mt-4">
                      <div className="font-semibold text-orange-200 mb-2 text-lg">Other Links</div>
                      <div className="flex flex-col gap-2">
                        {otherLinks.map(([platform, link]) => (
                          <a
                            key={platform}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-gray-800 rounded-lg p-3 text-orange-200 hover:bg-orange-800 transition"
                          >
                            {platformIcons[platform.replace(/\d+$/, '')] || <FaLink className="inline mr-2 text-blue-400" />}
                            {platform.charAt(0).toUpperCase() + platform.slice(1)}: {link}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}