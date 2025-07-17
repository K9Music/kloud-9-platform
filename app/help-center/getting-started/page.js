import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Cinzel } from "next/font/google";
import { FaArrowLeft } from 'react-icons/fa';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

export default function GettingStartedPage() {
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
            <h1 className="text-4xl font-bold text-white mb-4">Getting Started</h1>
            <p className="text-xl text-cyan-200 mb-4 italic">Your guide to joining and using Kloud 9</p>
          </div>
          <div className="bg-slate-800 rounded-2xl p-8 border border-cyan-900 text-cyan-100 text-lg space-y-6">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome to Kloud 9!</h2>
            <p>Follow these steps to get started:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li><span className="font-semibold text-cyan-200">Create an Account:</span> Click “Join as a Creator” or “Login” in the navigation to sign up with your email and password.</li>
              <li><span className="font-semibold text-cyan-200">Set Up Your Profile:</span> Fill out your profile details, add a bio, upload a profile photo and banner, and showcase your work with links to supported platforms.</li>
              <li><span className="font-semibold text-cyan-200">Explore the Platform:</span> Browse other creators, discover projects, and view your public profile.</li>
              <li><span className="font-semibold text-cyan-200">Collaboration Process:</span> When a business is interested in working with you, they express interest through Kloud 9. Our team will reach out and guide you through the next steps.</li>
            </ol>
            <p>If you need help at any step, <a href="/contact" className="text-cyan-400 underline hover:text-cyan-200">Contact Us</a>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 