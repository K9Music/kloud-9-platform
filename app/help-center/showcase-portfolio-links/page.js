import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Cinzel } from "next/font/google";
import { FaArrowLeft } from 'react-icons/fa';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

export default function ShowcasePortfolioLinksPage() {
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
            <h1 className="text-4xl font-bold text-white mb-4">How to add and organize showcase/portfolio links</h1>
            <p className="text-xl text-cyan-200 mb-4 italic">Show your work on your profile</p>
          </div>
          <div className="bg-slate-800 rounded-2xl p-8 border border-cyan-900 text-cyan-100 text-lg space-y-6">
            <ol className="list-decimal list-inside space-y-2">
              <li>Go to your profile page and find the Showcase/Portfolio section.</li>
              <li>Click the <b>Edit</b> button to add or update links to your work.</li>
              <li>Select the platforms you want to showcase (e.g., Spotify, YouTube, Instagram, Behance, etc.).</li>
              <li>You can add up to 3 links per platform. Use the <b>+ Add another link</b> button to add more.</li>
              <li>Click <b>Save</b> to update your showcase.</li>
              <li>If your platform is not listed, use the "Other Platform" option.</li>
              <li>If you need help, <a href="/contact" className="text-cyan-400 underline hover:text-cyan-200">Contact Us</a>.</li>
            </ol>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 