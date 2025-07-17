import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Cinzel } from "next/font/google";
import { FaArrowLeft } from 'react-icons/fa';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

export default function RequestEmailArtTypeChangePage() {
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
            <h1 className="text-4xl font-bold text-white mb-4">How to request an email or art type change</h1>
            <p className="text-xl text-cyan-200 mb-4 italic">Update your email or art type with support</p>
          </div>
          <div className="bg-slate-800 rounded-2xl p-8 border border-cyan-900 text-cyan-100 text-lg space-y-6">
            <ol className="list-decimal list-inside space-y-2">
              <li>Currently, you cannot change your email address or art type directly from your profile.</li>
              <li>To request a change, please <a href="/contact" className="text-cyan-400 underline hover:text-cyan-200">contact our support team</a> with your request.</li>
              <li>Our team will assist you and update your account as needed.</li>
            </ol>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 