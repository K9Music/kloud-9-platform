"use client";
import Link from "next/link";
import { FaPalette, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { Cinzel } from "next/font/google";
import { useState } from 'react';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-6 py-12 md:px-12 lg:px-24 border-t border-white/10 bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <FaPalette className="text-2xl text-cyan-400 scale-x-[-1]" />
              <span className={`text-xl font-bold text-white ${cinzel.className}`}>Kloud 9</span>
            </div>
            <p className="text-cyan-200 mb-2 italic">A self-sustaining ecosystem, powered by art</p>
            <p className="text-gray-400 text-sm">
            </p>

            {/* Newsletter moved to left side */}
            <div className="mt-28 pt-8 border-t border-white/10">
              <h4 className="text-white font-semibold mb-3">Subscribe to our newsletter</h4>
              <NewsletterForm />
              <p className="text-xs text-gray-400 mt-2">By subscribing, you agree to receive updates from Kloud 9. You can unsubscribe anytime.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/profiles" className="text-gray-400 hover:text-white transition-colors duration-200">Creators</Link>
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-200">About</Link>
              <Link href="/how-it-works" className="text-gray-400 hover:text-white transition-colors duration-200">How It Works</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</Link>
              <Link href="/create-profile" className="text-gray-400 hover:text-white transition-colors duration-200">Join as a Creator</Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors duration-200">Cookie Policy</Link>
            </div>
          </div>

          {/* Support & Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <div className="flex flex-col space-y-2 mb-6">
              <Link href="/faqs" className="text-gray-400 hover:text-white transition-colors duration-200">FAQs</Link>
              <Link href="/help-center" className="text-gray-400 hover:text-white transition-colors duration-200">Help Center</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">Contact Us</Link>
            </div>
            
            {/* Social Media */}
            <div className="mt-8 pt-5 border-t border-white/10">
              <h4 className="text-white font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/kloud9africa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-xl" />
                </a>
                <a
                  href="https://x.com/kloud9africa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label="X (Twitter)"
                >
                  <SiX className="text-xl" />
                </a>
                <a
                  href="https://linkedin.com/company/kloud9africa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="text-xl" />
                </a>
                <a
                  href="https://facebook.com/kloud9africa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <FaFacebook className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Kloud 9. All rights reserved. Art is profitable.
          </p>
        </div>
      </div>
    </footer>
  );
} 

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    if (!email || !firstName) {
      setStatus({ type: 'error', message: 'Please enter your email and first name.' });
      setSubmitting(false);
      return;
    }
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, lastName }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', message: data.message || 'Subscribed!' });
        setEmail('');
        setFirstName('');
        setLastName('');
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to subscribe.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="flex-1 px-3 py-2 rounded-lg bg-slate-800 text-white border border-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="text"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          className="flex-1 px-3 py-2 rounded-lg bg-slate-800 text-white border border-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last name (optional)"
          className="flex-1 px-3 py-2 rounded-lg bg-slate-800 text-white border border-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <button
          type="submit"
          disabled={submitting}
          className={`px-4 py-2 rounded-lg font-semibold text-white ${submitting ? 'bg-gray-600' : 'bg-cyan-600 hover:bg-cyan-700'} transition-colors`}
        >
          {submitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      {status && (
        <div className={`${status.type === 'success' ? 'text-green-400' : 'text-red-400'} text-sm`}>{status.message}</div>
      )}
    </form>
  );
}