import Link from "next/link";
import { FaMusic, FaUsers, FaStar, FaArrowRight, FaPlay, FaPalette, FaVideo, FaCamera } from "react-icons/fa";
import { Cinzel } from "next/font/google";
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserCarousel from '../components/UserCarousel';
const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
      <Header />

      {/* Hero Section */}
      <section className="px-6 py-20 md:px-12 lg:px-24 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center mb-6">
            <span className={`text-5xl md:text-7xl font-bold text-white mb-2 ${cinzel.className}`}>Kloud 9</span>
            <span className="text-lg md:text-2xl text-cyan-200 italic font-medium tracking-wide mb-4">A self-sustaining ecosystem, powered by art</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Discover Top Creative Talent. We Handle the Rest.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Browse a curated ecosystem of creators. When you find the perfect fit, Kloud 9 manages the connection and business process—ensuring a seamless, professional experience for both clients and creators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/profiles"
              className="group bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Browse Creators</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link 
              href="/create-profile"
              className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center space-x-2"
            >
              <FaPalette />
              <span>Join as a Creator</span>
            </Link>
          </div>
        </div>
      </section>

      {/* User Carousel Section */}
      <UserCarousel />

      {/* Features Section */}
      <section className="px-6 py-20 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Why Choose Kloud 9?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-cyan-400/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <FaMusic className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Creative Profiles</h3>
              <p className="text-gray-300 leading-relaxed">
                Discover stunning profiles that showcase the work, style, and creative vision of top talent across all creative fields.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-cyan-400/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <FaUsers className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Discover & Commission Talent</h3>
              <p className="text-gray-300 leading-relaxed">
                Find the perfect creator for your project. Submit your request to Kloud 9, and we'll handle the outreach, negotiation, and project management for you.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-cyan-400/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-white rounded-xl flex items-center justify-center mb-6">
                <FaStar className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">End-to-End Project Facilitation</h3>
              <p className="text-gray-300 leading-relaxed">
                From your first inquiry to project completion, Kloud 9 ensures a seamless, professional experience for both clients and creators—managing every step and earning our commission.
              </p>
            </div>
            {/* New Feature Card for Ecosystem & Opportunities */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center mb-6">
                <FaPalette className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">A Self-Sustaining Ecosystem</h3>
              <p className="text-gray-300 leading-relaxed">
                Kloud 9 is more than a platform—it's an ecosystem where creators gain exposure and clients access top talent, all with the assurance of professional management and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Fields Section */}
      <section className="px-6 py-20 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            For All Creative Professionals
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <FaMusic className="text-xl text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Musicians & Producers</h3>
              <p className="text-gray-400 text-sm">Artists, beat producers, songwriters, and engineers</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <FaPalette className="text-xl text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Designers</h3>
              <p className="text-gray-400 text-sm">Graphics designers, visual artists, and creative directors</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-white rounded-lg flex items-center justify-center mb-4">
                <FaVideo className="text-xl text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Directors</h3>
              <p className="text-gray-400 text-sm">Music video directors, movie directors, and filmmakers</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-white rounded-lg flex items-center justify-center mb-4">
                <FaCamera className="text-xl text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Content Creators</h3>
              <p className="text-gray-400 text-sm">Skitmakers, video vixens, and digital content creators</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-sm rounded-3xl p-12 border border-cyan-400/30">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Join the Creative Community?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Start building your profile today and connect with the finest creative talent across all industries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/create-profile"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-105"
              >
                Create Your Profile
              </Link>
              <Link 
                href="/profiles"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200"
              >
                Explore Creators
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
