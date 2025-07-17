'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Cinzel } from "next/font/google";
import { FaSearch, FaQuestionCircle, FaRegLifeRing } from 'react-icons/fa';
import { useState, useMemo } from 'react';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

const allTopics = [
  { title: 'How to edit your username', href: '/help-center/edit-username', group: 'Profile Management' },
  { title: 'How to update your display name', href: '/help-center/update-display-name', group: 'Profile Management' },
  { title: 'How to edit your bio/about section', href: '/help-center/edit-bio', group: 'Profile Management' },
  { title: 'How to change your password', href: '/help-center/change-password', group: 'Profile Management' },
  { title: 'How to update your profile photo and banner', href: '/help-center/update-profile-photo-banner', group: 'Profile Management' },
  { title: 'How to view your public profile', href: '/help-center/view-public-profile', group: 'Profile Management' },
  { title: 'How to add and organize showcase/portfolio links', href: '/help-center/showcase-portfolio-links', group: 'Showcase & Portfolio' },
  { title: 'How to request an email or art type change', href: '/help-center/request-email-arttype-change', group: 'Account Requests' },
  { title: 'How to request account deletion', href: '/help-center/request-account-deletion', group: 'Account Requests' },
];

const groupOrder = ['Profile Management', 'Showcase & Portfolio', 'Account Requests'];

export default function HelpCenterPage() {
  const [search, setSearch] = useState('');
  const filteredTopics = useMemo(() => {
    if (!search.trim()) return allTopics;
    const q = search.trim().toLowerCase();
    return allTopics.filter(t => t.title.toLowerCase().includes(q));
  }, [search]);
  const grouped = useMemo(() => {
    const groups = {};
    filteredTopics.forEach(t => {
      if (!groups[t.group]) groups[t.group] = [];
      groups[t.group].push(t);
    });
    return groups;
  }, [filteredTopics]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 px-6 py-12 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">Help Center</h1>
            <p className="text-xl text-cyan-200 mb-4 italic">How can we help you today?</p>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Browse specific topics or search for answers to your questions about Kloud 9.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex items-center bg-slate-800 rounded-xl border border-cyan-900 px-4 py-3 mb-10">
            <FaSearch className="text-cyan-400 text-xl mr-3" />
            <input
              type="text"
              placeholder="Search help topics..."
              className="flex-1 bg-transparent text-white placeholder-cyan-300 focus:outline-none"
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoFocus
            />
          </div>

          {/* Filtered Results or Grouped Topics */}
          {filteredTopics.length === 0 ? (
            <div className="text-center text-cyan-200 mb-12">No results found.</div>
          ) : (
            groupOrder.map(group =>
              grouped[group] && grouped[group].length > 0 && (
                <div className="mb-10" key={group}>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <FaQuestionCircle className="text-cyan-400" /> {group}
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {grouped[group].map((topic, idx) => (
                      <a
                        key={topic.href}
                        href={topic.href}
                        className="block bg-slate-800 border border-cyan-900 rounded-xl p-6 text-cyan-100 hover:bg-cyan-900 hover:text-white font-semibold transition-all duration-200"
                      >
                        {topic.title}
                      </a>
                    ))}
                  </div>
                </div>
              )
            )
          )}

          {/* Prompt to Visit FAQs or Contact */}
          <div className="text-center mb-8">
            <FaRegLifeRing className="mx-auto text-3xl text-cyan-400 mb-2" />
            <p className="text-cyan-100 text-lg mb-2">Still need help?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/faqs" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200">Visit FAQs</a>
              <a href="/contact" className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200">Contact Us</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 