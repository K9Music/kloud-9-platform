'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Cinzel } from "next/font/google";
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    {
      question: 'What is Kloud 9?',
      answer: 'Kloud 9 is a platform that connects businesses with top creative professionals for seamless, managed collaboration.'
    },
    {
      question: 'How do I join as a creator?',
      answer: 'Click “Join as a Creator” on the homepage or in the navigation, fill out the form, and your profile will be created instantly.'
    },
    {
      question: 'How do businesses start a project?',
      answer: 'Browse creators, express interest in working with someone, and our team will guide you through the next steps.'
    },
    {
      question: 'How are payments handled?',
      answer: 'Payments are managed securely through Kloud 9, ensuring timely and fair compensation for creators and peace of mind for businesses.'
    },
    {
      question: 'Who do I contact for support?',
      answer: 'You can reach our support team via the Contact page or visit the Help Center for quick answers.'
    }
  ];

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 px-6 py-12 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-cyan-200 mb-4 italic">Find quick answers to common questions about Kloud 9.</p>
          </div>
        </div>
        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto mb-8">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-slate-800 rounded-2xl border border-cyan-900 mb-4">
              <button
                className="w-full flex justify-between items-center p-6 focus:outline-none"
                onClick={() => toggleFAQ(idx)}
                aria-expanded={openIndex === idx}
                aria-controls={`faq-answer-${idx}`}
              >
                <span className="text-xl font-semibold text-cyan-200 text-left">{faq.question}</span>
                <FaChevronDown className={`ml-4 text-cyan-300 transition-transform duration-200 ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === idx && (
                <div id={`faq-answer-${idx}`} className="px-6 pb-6 text-cyan-100 text-lg animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Still Need Help Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="bg-slate-800 rounded-2xl p-8 border border-cyan-900">
            <h2 className="text-2xl font-bold text-white mb-2">Still need help?</h2>
            <p className="text-cyan-100 text-lg mb-6">If you can’t find the answer you’re looking for, we’re here to help.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200">Contact Us</a>
              <a href="/help-center" className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200">Visit Help Center</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 