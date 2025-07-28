import Link from "next/link";
import { FaPalette, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-6 py-12 md:px-12 lg:px-24 border-t border-white/10 bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <FaPalette className="text-2xl text-cyan-400" />
              <span className={`text-xl font-bold text-white ${cinzel.className}`}>Kloud 9</span>
            </div>
            <p className="text-cyan-200 mb-2 italic">A self-sustaining ecosystem, powered by art</p>
            <p className="text-gray-400 text-sm">
              Connecting creative professionals and clients worldwide through our innovative platform.
            </p>
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
            <h4 className="text-white font-semibold mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/kloud9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://x.com/kloud9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="X (Twitter)"
              >
                <SiX className="text-xl" />
              </a>
              <a
                href="https://linkedin.com/company/kloud9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a
                href="https://facebook.com/kloud9"
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

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Kloud 9. All rights reserved. Connecting creative professionals and clients worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
} 