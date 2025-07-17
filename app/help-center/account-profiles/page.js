import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Cinzel } from "next/font/google";
import { FaArrowLeft } from 'react-icons/fa';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

export default function AccountProfilesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 px-6 py-12 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <a href="/help-center" className="inline-flex items-center text-cyan-300 hover:text-cyan-100 mb-6 font-semibold">
            <FaArrowLeft className="mr-2" />
            Back to Help Center
          </a>
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-4">Account & Profiles</h1>
            <p className="text-xl text-cyan-200 mb-4 italic">Manage your account and profile details</p>
          </div>
          <div className="bg-slate-800 rounded-2xl p-8 border border-cyan-900 text-cyan-100 text-lg space-y-6">
            <h2 className="text-2xl font-bold text-white mb-2">Profile & Account Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-semibold text-cyan-200">Edit Username:</span> You can change your username once every 90 days. This also updates your public profile link.</li>
              <li><span className="font-semibold text-cyan-200">Edit Display Name:</span> Update your name as it appears on your profile.</li>
              <li><span className="font-semibold text-cyan-200">Edit Bio/About:</span> Share your story, background, or creative journey in your profile bio.</li>
              <li><span className="font-semibold text-cyan-200">Change Password:</span> Update your password for account security.</li>
              <li><span className="font-semibold text-cyan-200">Profile Photo & Banner:</span> Upload or update your profile photo and banner image to personalize your profile.</li>
              <li><span className="font-semibold text-cyan-200">Showcase/Portfolio Links:</span> Add, edit, and organize links to your work on platforms like Spotify, YouTube, SoundCloud, Apple Music, Instagram, Behance, Dribbble, TikTok, Vimeo, IMDb, and more. You can add up to 3 links per platform.</li>
              <li><span className="font-semibold text-cyan-200">View Public Profile:</span> See how your profile appears to others.</li>
              <li><span className="font-semibold text-cyan-200">Email or Art Type Changes:</span> To change your email or art type, please <a href="/contact" className="text-cyan-400 underline hover:text-cyan-200">contact support</a>.</li>
              <li><span className="font-semibold text-cyan-200">Account Deletion:</span> To delete your account, please <a href="/contact" className="text-cyan-400 underline hover:text-cyan-200">contact support</a>.</li>
            </ul>
            <p>For more help, <a href="/contact" className="text-cyan-400 underline hover:text-cyan-200">Contact Us</a>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 