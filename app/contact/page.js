'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaEnvelope, FaPhone, FaQuestionCircle } from 'react-icons/fa';
import { Cinzel } from "next/font/google";
import React, { useState } from 'react';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: data.message });
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        setSubmitStatus({ type: 'error', message: data.error });
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            {/* Status Messages */}
            {submitStatus && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-900 border border-green-700 text-green-100' 
                  : 'bg-red-900 border border-red-700 text-red-100'
              }`}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-cyan-100 font-semibold mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 text-white border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500" 
                  required 
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-cyan-100 font-semibold mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 text-white border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500" 
                  required 
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-cyan-100 font-semibold mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 text-white border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500" 
                  required 
                  disabled={isSubmitting}
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg font-semibold text-lg transition-all duration-200 ${
                  isSubmitting 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700'
                } text-white`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
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
              <a href="mailto:kloud9@k9music.com" className="text-gray-300 hover:text-cyan-300 transition-colors">kloud9@k9music.com</a>
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