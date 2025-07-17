import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaEnvelope, FaPhone, FaQuestionCircle } from 'react-icons/fa';
import { Cinzel } from "next/font/google";
import React from 'react';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 px-6 py-12 md:px-12 lg:px-24">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-xl text-cyan-200 mb-4 italic">We're here to help you connect, create, and succeed</p>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Have a question, partnership inquiry, or need support? Reach out and our team will get back to you as soon as possible.
            </p>
          </div>

          {/* Contact Form Section */}
          <div className="bg-slate-800 rounded-2xl p-8 mb-10 border border-cyan-900">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-cyan-100 font-semibold mb-2">Name</label>
                <input type="text" id="name" name="name" className="w-full px-4 py-3 rounded-lg bg-slate-900 text-white border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-cyan-100 font-semibold mb-2">Email</label>
                <input type="email" id="email" name="email" className="w-full px-4 py-3 rounded-lg bg-slate-900 text-white border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-cyan-100 font-semibold mb-2">Message</label>
                <textarea id="message" name="message" rows={5} className="w-full px-4 py-3 rounded-lg bg-slate-900 text-white border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500" required></textarea>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-200">
                Send Message
              </button>
            </form>
          </div>

          {/* Company Contact Info Section */}
          <div className="bg-slate-800 rounded-2xl p-6 mb-10 border border-cyan-900 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <FaEnvelope className="text-cyan-400 text-xl" />
                <span className="text-cyan-100 font-semibold">Email</span>
              </div>
              <a href="mailto:hello@kloud9.com" className="text-gray-300 hover:text-cyan-300 transition-colors">hello@kloud9.com</a>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <FaPhone className="text-cyan-400 text-xl" style={{ transform: 'scaleX(-1)' }} />
                <span className="text-cyan-100 font-semibold">Phone</span>
              </div>
              <span className="text-gray-300">+234-913-908-8814</span>
            </div>
          </div>

          {/* Support/FAQ Prompt Section */}
          <div className="text-center">
            <FaQuestionCircle className="mx-auto text-3xl text-cyan-400 mb-2" />
            <p className="text-cyan-100 text-lg mb-2">Looking for answers or need help?</p>
            <a href="/help-center" className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200">
              Visit our Help Center
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 