import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaRegLightbulb, FaUserCheck, FaHandshake, FaRocket } from 'react-icons/fa';
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 px-6 py-12 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">How It Works</h1>
            <p className="text-xl text-cyan-200 mb-4 italic">Seamless creative collaboration</p>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Discover a new way to connect with creative professionals and bring your projects to life, effortlessly, transparently, and with confidence.
            </p>
          </div>

          {/* Step-by-Step Process Section */}
          <div className="bg-slate-800 rounded-2xl p-8 mb-12 border border-cyan-900">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <FaRegLightbulb className="text-2xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">The Process</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">For Creators</h3>
                <ol className="text-cyan-100 space-y-2 list-decimal list-inside">
                  <li>Showcase your work and expertise with a professional profile</li>
                  <li>Get discovered by businesses seeking creative talent</li>
                  <li>Receive project opportunities and collaborate with confidence</li>
                  <li>Focus on your craft while enjoying dedicated support</li>
                  <li>Enjoy fair, timely compensation for your work</li>
                </ol>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">For Businesses</h3>
                <ol className="text-cyan-100 space-y-2 list-decimal list-inside">
                  <li>Browse and filter top creative talent</li>
                  <li>Express interest in working with a creator</li>
                  <li>Let the platform streamline communication and project details</li>
                  <li>Track progress and stay updated every step of the way</li>
                  <li>Experience quality assurance and ongoing support</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Platform Features Section */}
          <div className="bg-slate-800 rounded-2xl p-8 mb-12 border border-cyan-900">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <FaRocket className="text-2xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Platform Features</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <FaUserCheck className="mx-auto text-3xl text-cyan-400 mb-2" />
                <h3 className="text-lg font-semibold text-white mb-2">Verified Talent</h3>
                <p className="text-cyan-100">All creators are vetted for quality and professionalism, so you can collaborate with peace of mind.</p>
              </div>
              <div className="text-center">
                <FaHandshake className="mx-auto text-3xl text-cyan-400 mb-2" />
                <h3 className="text-lg font-semibold text-white mb-2">Effortless Collaboration</h3>
                <p className="text-cyan-100">Enjoy smooth communication, clear deliverables, and a streamlined project experience from start to finish.</p>
              </div>
              <div className="text-center">
                <FaRegLightbulb className="mx-auto text-3xl text-cyan-400 mb-2" />
                <h3 className="text-lg font-semibold text-white mb-2">Quality Assurance</h3>
                <p className="text-cyan-100">Every project is supported to ensure high standards and satisfaction for all parties involved.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl p-8 border border-cyan-400/30">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Next Project?</h2>
            <p className="text-cyan-100 text-lg mb-6">
              Whether you're looking to create or collaborate, our platform makes it easy to connect and succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/profiles"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Find Creators
              </a>
              <a 
                href="/create-profile"
                className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Join as a Creator
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 