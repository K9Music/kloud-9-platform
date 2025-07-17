import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Cinzel } from "next/font/google";
import { FaArrowLeft } from 'react-icons/fa';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

export default function EditUsernamePage() {
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
            <h1 className="text-4xl font-bold text-white mb-4">How to edit your username</h1>
            <p className="text-xl text-cyan-200 mb-4 italic">Change your username and update your public profile link</p>
          </div>
          <div className="bg-slate-800 rounded-2xl p-8 border border-cyan-900 text-cyan-100 text-lg space-y-6">
            <ol className="list-decimal list-inside space-y-2">
              <li>Go to your profile page and click the <b>Edit</b> button in the Account Info section.</li>
              <li>Enter your new username. <b>You can only change your username once every 90 days.</b></li>
              <li>Click <b>Save</b> to update your username. Your public profile link will also update to reflect your new username.</li>
              <li>If you need help, <a href="/contact" className="text-cyan-400 underline hover:text-cyan-200">Contact Us</a>.</li>
            </ol>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 