import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Cinzel } from "next/font/google";
import { FaArrowLeft } from 'react-icons/fa';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

export default function ContactSupportPage() {
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
            <h1 className="text-4xl font-bold text-white mb-4">Contact & Support</h1>
            <p className="text-xl text-cyan-200 mb-4 italic">How to reach our support team</p>
          </div>
          <div className="bg-slate-800 rounded-2xl p-8 border border-cyan-900 text-cyan-100 text-lg space-y-6">
            <h2 className="text-2xl font-bold text-white mb-2">Getting Help</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-semibold text-cyan-200">Contact Form:</span> Use our <a href="/contact" className="text-cyan-400 underline hover:text-cyan-200">Contact page</a> to send us a message. We aim to respond within 24 hours.</li>
              <li><span className="font-semibold text-cyan-200">Help Center:</span> Browse articles and FAQs for instant answers to common questions.</li>
              <li><span className="font-semibold text-cyan-200">Email:</span> Reach us directly at <a href="mailto:hello@kloud9.com" className="text-cyan-400 underline hover:text-cyan-200">hello@kloud9.com</a>.</li>
              <li><span className="font-semibold text-cyan-200">Phone:</span> Call us at <span className="text-cyan-400">+234-913-908-8814</span> during business hours.</li>
            </ul>
            <p>We're here to help you succeed on Kloud 9!</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 