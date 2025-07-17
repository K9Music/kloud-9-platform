'use client';
import Link from "next/link";
import { FaPalette } from "react-icons/fa";
import { Cinzel } from "next/font/google";
import { useState } from 'react';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 py-4 md:px-12 lg:px-24 bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 relative z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2 group">
        <FaPalette className="text-3xl text-cyan-400 group-hover:text-cyan-300 transition-colors duration-200" />
        <span className={`text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors duration-200 ${cinzel.className}`}>Kloud 9</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="flex items-center space-x-6 hidden md:flex">
        <Link href="/profiles" className="text-gray-300 hover:text-white transition-colors duration-200">Creators</Link>
        <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200">About</Link>
        <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors duration-200">How It Works</Link>
        <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">Contact</Link>
        <Link href="/login" className="text-gray-300 hover:text-white transition-colors duration-200">Login</Link>
        <Link href="/create-profile" className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">Join as a Creator</Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="block md:hidden text-white p-2 z-50"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle mobile menu"
        style={{ background: 'transparent' }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-slate-900 border-t border-cyan-800 shadow-lg md:hidden z-50 p-6 flex flex-col space-y-4">
          <Link 
            href="/profiles" 
            className="text-gray-300 hover:text-white transition-colors duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Creators
          </Link>
          <Link 
            href="/about" 
            className="text-gray-300 hover:text-white transition-colors duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/how-it-works" 
            className="text-gray-300 hover:text-white transition-colors duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            How It Works
          </Link>
          <Link 
            href="/contact" 
            className="text-gray-300 hover:text-white transition-colors duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <Link 
            href="/login" 
            className="text-gray-300 hover:text-white transition-colors duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Login
          </Link>
          <Link 
            href="/create-profile" 
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 inline-block text-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            Join as a Creator
          </Link>
        </div>
      )}
    </nav>
  );
} 