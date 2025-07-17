'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash, FaCamera } from 'react-icons/fa';
import { FaSpotify, FaYoutube, FaSoundcloud, FaApple, FaMusic, FaLink, FaInstagram, FaTiktok, FaDribbble, FaBehance, FaVimeo, FaImdb } from 'react-icons/fa';
import AccountInfoSection from './AccountInfoSection';
import PasswordSection from './PasswordSection';
import BioSection from './BioSection';
import ImagesSection from './ImagesSection';
import ShowcaseSection from './ShowcaseSection';
import ProfileDetailsSection from './ProfileDetailsSection';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const NON_EDITABLE_FIELDS = [
  { label: 'Email', key: 'email' },
  { label: 'Art Type', key: 'artType' },
];

const EDITABLE_FIELDS = [
  { label: 'Password', key: 'password', type: 'password' },
  { label: 'Bio', key: 'bio', type: 'textarea' },
  { label: 'Profile Photo', key: 'photoUrl', type: 'file' },
  { label: 'Banner Image', key: 'bannerUrl', type: 'file' },
  { label: 'Genre', key: 'genre', type: 'text' },
];

// Add getOptionalFields helper, matching create-profile logic
const getOptionalFields = (artType) => {
  switch (artType) {
    case 'musician':
      return ['genre', 'stageName'];
    case 'beat producer':
      return ['genre', 'producerTag'];
    case 'mixing/mastering engineer':
      return ['engineerTag'];
    case 'music video director':
    case 'movie director':
      return ['directedBy'];
    case 'graphics designer':
      return ['designerStyle'];
    case 'songwriter':
      return ['genre'];
    case 'skitmaker':
      return ['skitmakerName'];
    case 'video vixen':
      return ['vixenName'];
    default:
      return [];
  }
};

const PLATFORM_ICONS = {
  spotify: <FaSpotify className="inline text-green-500 mr-1" />,
  youtube: <FaYoutube className="inline text-red-500 mr-1" />,
  soundcloud: <FaSoundcloud className="inline text-orange-500 mr-1" />,
  appleMusic: <FaApple className="inline text-pink-500 mr-1" />,
  audiomack: <FaMusic className="inline text-yellow-500 mr-1" />,
  tiktok: <FaTiktok className="inline text-black mr-1" />,
  beatstars: <FaMusic className="inline text-red-700 mr-1" />,
  custom1: <FaLink className="inline text-blue-500 mr-1" />,
  custom2: <FaLink className="inline text-blue-500 mr-1" />,
  custom3: <FaLink className="inline text-blue-500 mr-1" />,
  instagram: <FaInstagram className="inline text-pink-500 mr-1" />,
  vimeo: <FaLink className="inline text-blue-500 mr-1" />,
  behance: <FaLink className="inline text-blue-500 mr-1" />,
  dribbble: <FaLink className="inline text-blue-500 mr-1" />,
  imdb: <FaLink className="inline text-blue-500 mr-1" />,
  portfolio: <FaLink className="inline text-blue-500 mr-1" />,
};
const ART_TYPES = [
  { value: 'musician', label: 'Musician', showcases: ['spotify', 'appleMusic', 'youtube', 'soundcloud', 'audiomack', 'tiktok'] },
  { value: 'beat producer', label: 'Beat Producer', showcases: ['spotify', 'appleMusic', 'youtube', 'soundcloud', 'audiomack', 'tiktok', 'beatstars'] },
  { value: 'songwriter', label: 'Songwriter', showcases: ['spotify', 'appleMusic', 'youtube', 'soundcloud', 'audiomack', 'tiktok'] },
  { value: 'mixing/mastering engineer', label: 'Mixing/Mastering Engineer', showcases: ['spotify', 'appleMusic', 'youtube', 'soundcloud', 'audiomack', 'tiktok'] },
  { value: 'graphics designer', label: 'Graphics Designer', showcases: ['behance', 'dribbble', 'instagram', 'portfolio'] },
  { value: 'music video director', label: 'Music Video Director', showcases: ['youtube', 'vimeo', 'instagram', 'tiktok'] },
  { value: 'movie director', label: 'Movie Director', showcases: ['imdb', 'youtube', 'vimeo', 'portfolio'] },
  { value: 'skitmaker', label: 'Skitmaker', showcases: ['youtube', 'tiktok', 'instagram'] },
  { value: 'video vixen', label: 'Video Vixen', showcases: ['youtube', 'tiktok', 'instagram'] },
  { value: 'other', label: 'Other', showcases: ['custom1', 'custom2', 'custom3'] },
];
const getShowcasePlatforms = (artType) => {
  const type = ART_TYPES.find((t) => t.value === artType);
  return type ? type.showcases : [];
};

// Utility to convert a string to title case (each word capitalized)
function toSentenceCase(str) {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/login');
      return;
    }
    // Fetch user profile from API
    const fetchProfile = async () => {
      setLoading(true);
      const res = await fetch(`/api/profiles?email=${session.user.email}`);
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      } else {
        setError('Failed to load profile.');
      }
      setLoading(false);
    };
    fetchProfile();
  }, [session, status, router]);

  // Section save handlers (call PATCH API and update local state)
  const handleAccountInfoSave = async (fields) => {
    const res = await fetch(`/api/profiles/${profile.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    });
    if (!res.ok) throw new Error('Failed to update account info.');
    setProfile((prev) => ({ ...prev, ...fields }));
  };
  const handlePasswordSave = async ({ currentPassword, newPassword }) => {
    const res = await fetch(`/api/profiles/${profile.id}/password`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to update password.');
    }
  };
  const handleBioSave = async ({ bio }) => {
    const res = await fetch(`/api/profiles/${profile.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bio }),
    });
    if (!res.ok) throw new Error('Failed to update bio.');
    setProfile((prev) => ({ ...prev, bio }));
  };
  const handleImagesSave = async ({ photoUrl, bannerUrl }) => {
    const res = await fetch(`/api/profiles/${profile.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ photoUrl, bannerUrl }),
    });
    if (!res.ok) throw new Error('Failed to update images.');
    setProfile((prev) => ({ ...prev, photoUrl, bannerUrl }));
  };
  const handleShowcaseSave = async (showcase) => {
    const res = await fetch(`/api/profiles/${profile.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ showcase }),
    });
    if (!res.ok) throw new Error('Failed to update showcase.');
    setProfile((prev) => ({ ...prev, showcase }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
        <div className="text-cyan-100 text-xl">Loading profile...</div>
      </div>
    );
  }
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
        <div className="text-cyan-100 text-xl">{error || 'Error loading profile. Please try again later.'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
      <Header />
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-5xl p-8 glassmorphism rounded-2xl shadow-xl text-cyan-100 relative border border-white/10">
          <a
            href={`/profile/${profile.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-8 top-8 px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 text-sm font-semibold shadow"
          >
            View Public Profile
          </a>
          <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>
          {/* Non-editable fields */}
          <div className="mb-8 p-6 rounded-lg bg-slate-800 shadow">
            <div className="mb-4 text-cyan-300 text-xs italic">
              <strong>Email or art type changes:</strong><br />
              For security reasons, these fields can only be updated by our support team.<br />
              <a
                href="mailto:support@k9music.com"
                className="underline text-cyan-200 hover:text-cyan-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact support
              </a> to request a change.
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Email</label>
              <input
                type="text"
                value={profile.email || ''}
                disabled
                className="block w-full p-3 rounded-lg border border-cyan-700 bg-slate-900 text-cyan-300 opacity-60 cursor-not-allowed"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Art Type</label>
              <input
                type="text"
                value={toSentenceCase(profile.artType) || ''}
                disabled
                className="block w-full p-3 rounded-lg border border-cyan-700 bg-slate-900 text-cyan-300 opacity-60 cursor-not-allowed"
                readOnly
              />
            </div>
          </div>
          {/* Reordered sections to match public profile layout */}
          <ImagesSection
            initialPhotoUrl={profile.photoUrl}
            initialBannerUrl={profile.bannerUrl}
            onSave={handleImagesSave}
          />
          <AccountInfoSection
            initialUsername={profile.username}
            initialName={profile.name}
            artType={profile.artType}
            lastUsernameChange={profile.lastUsernameChange}
            usernameChangeCooldown={profile.usernameChangeCooldown}
            onSave={handleAccountInfoSave}
          />
          <ProfileDetailsSection
            artType={profile.artType}
            genre={profile.genre}
            stageName={profile.stageName}
            producerTag={profile.producerTag}
            engineerTag={profile.engineerTag}
            directedBy={profile.directedBy}
            designerStyle={profile.designerStyle}
            skitmakerName={profile.skitmakerName}
            vixenName={profile.vixenName}
            onSave={async (fields) => {
              const res = await fetch(`/api/profiles/${profile.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fields),
              });
              if (!res.ok) throw new Error('Failed to update profile details.');
              setProfile((prev) => ({ ...prev, ...fields }));
            }}
          />
          <BioSection initialBio={profile.bio} onSave={handleBioSave} />
          <ShowcaseSection
            initialShowcase={profile.showcase}
            artType={profile.artType}
            onSave={handleShowcaseSave}
          />
          <PasswordSection onSave={handlePasswordSave} />
        </div>
      </div>
      <Footer />
    </div>
  );
} 