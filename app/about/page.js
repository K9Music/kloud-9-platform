import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaPalette, FaUsers, FaStar, FaLightbulb } from 'react-icons/fa';
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 px-6 py-12 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">About Kloud 9</h1>
            <p className="text-xl text-cyan-200 mb-4 italic">A self-sustaining ecosystem, powered by art</p>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We're building the future of creative collaboration: a platform where talent meets opportunity, and where every creative professional can thrive in a supportive, professional ecosystem.
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-slate-800 rounded-2xl p-8 mb-12 border border-cyan-900">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <FaLightbulb className="text-2xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-cyan-100 text-lg leading-relaxed mb-6">
              Kloud 9 exists to bridge the gap between exceptional creative talent and the clients who need them. 
              We believe that the best creative work happens when talented professionals are given the support, 
              resources, and opportunities they deserve.
            </p>
            <p className="text-cyan-100 text-lg leading-relaxed">
              Our platform serves as more than just a directory; it's a comprehensive ecosystem that handles the business side of creative collaboration, allowing artists to focus on what they do best: creating.
            </p>
          </div>

          {/* Vision Section */}
          <div className="bg-slate-800 rounded-2xl p-8 mb-12 border border-cyan-900">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <FaStar className="text-2xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Our Vision</h2>
            </div>
            <p className="text-cyan-100 text-lg leading-relaxed mb-6">
              We envision a world where creative professionals have the same level of support, recognition, 
              and financial stability as other industries. A world where talent is properly valued and 
              compensated for their unique contributions.
            </p>
            <p className="text-cyan-100 text-lg leading-relaxed">
              By creating a self-sustaining ecosystem that benefits both creators and clients, we're building 
              a future where creative collaboration is seamless, professional, and mutually rewarding.
            </p>
          </div>

          {/* How It Works Section */}
          <div className="bg-slate-800 rounded-2xl p-8 mb-12 border border-cyan-900">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center">
                <FaUsers className="text-2xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">How We Serve the Community</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">For Creators</h3>
                <ul className="text-cyan-100 space-y-2">
                  <li>• Professional profile showcasing your work and expertise</li>
                  <li>• Access to quality clients and projects</li>
                  <li>• Business support and project management</li>
                  <li>• Fair compensation and professional treatment</li>
                  <li>• Community of fellow creative professionals</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">For Clients</h3>
                <ul className="text-cyan-100 space-y-2">
                  <li>• Curated access to top creative talent</li>
                  <li>• Streamlined project management</li>
                  <li>• Quality assurance and professional standards</li>
                  <li>• Transparent pricing and clear communication</li>
                  <li>• Ongoing support throughout the project</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-slate-800 rounded-2xl p-8 mb-12 border border-cyan-900">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-white rounded-xl flex items-center justify-center">
                <FaPalette className="text-2xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Our Values</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Quality</h3>
                <p className="text-cyan-100">We maintain high standards for both creators and projects, ensuring exceptional results.</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Transparency</h3>
                <p className="text-cyan-100">Clear communication and honest business practices are at the core of everything we do.</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
                <p className="text-cyan-100">We believe in building a supportive ecosystem where everyone can thrive and grow.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl p-8 border border-cyan-400/30">
            <h2 className="text-3xl font-bold text-white mb-4">Join the Kloud 9 Community</h2>
            <p className="text-cyan-100 text-lg mb-6">
              Whether you're a creative professional looking to showcase your work or a client seeking exceptional talent, 
              Kloud 9 is here to facilitate meaningful connections and successful collaborations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/create-profile"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Join as a Creator
              </a>
              <a 
                href="/profiles"
                className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Browse Creators
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 