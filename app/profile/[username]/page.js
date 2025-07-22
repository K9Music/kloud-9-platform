import ProfileClient from './ProfileClient';
import { FaStar, FaSpotify, FaApple, FaYoutube, FaSoundcloud, FaTiktok, FaInstagram, FaBehance, FaDribbble, FaVimeo, FaImdb, FaLink, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { SiAudiomack, SiBeatstars, SiX, SiThreads } from 'react-icons/si';
import BioSection from './BioSection';
import ShowcaseEmbed from './ShowcaseEmbed';
import Link from "next/link";
import { FaPalette } from "react-icons/fa";
import { Cinzel } from "next/font/google";
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

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

export default async function PublicProfilePage({ params }) {
  if (!params || !params.username) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-black via-orange-900 to-teal-900">
        <div className="text-orange-100 text-xl">404 — Profile not found</div>
        </div>
        <Footer />
      </div>
    );
  }
  const { username } = params;
  const profile = await getProfile(username);
  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-black via-orange-900 to-teal-900">
        <div className="text-orange-100 text-xl">404 — Profile not found</div>
        </div>
        <Footer />
      </div>
    );
  }
  // Pass platformIcons and profile to ProfileClient
  return <ProfileClient profile={profile} platformIcons={platformIcons} />;
}