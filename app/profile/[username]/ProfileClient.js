'use client';
import { useState, useEffect, useRef } from 'react';
import BioSection from './BioSection';
import ShowcaseEmbed from './ShowcaseEmbed';
import Link from "next/link";
import { FaStar, FaPalette, FaFacebook, FaLinkedin, FaLink } from 'react-icons/fa';
import { SiX, SiThreads } from 'react-icons/si';
import { Cinzel } from "next/font/google";
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

function toSentenceCase(str) {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export default function ProfileClient({ profile, platformIcons }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', budget: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const modalRef = useRef(null);

  // Focus trap for accessibility
  useEffect(() => {
    if (modalOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [modalOpen]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  }

  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Enter a valid email.';
    if (!form.message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  }

  function closeModal() {
    setModalOpen(false);
    setForm({ name: '', email: '', company: '', budget: '', message: '' });
    setErrors({});
    setSubmitting(false);
    setSubmitted(false);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Main profile content */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="w-full max-w-5xl p-4 sm:p-8 bg-gradient-to-br from-slate-800 via-slate-900 to-cyan-950 rounded-2xl shadow-lg text-cyan-100 border border-cyan-900">
        <div className="flex flex-col items-center mb-6">
          {profile.bannerUrl && (
              <img src={profile.bannerUrl} alt="Banner" className="w-full h-40 object-cover rounded-2xl mb-4 border border-cyan-900" />
          )}
          <img
            src={profile.photoUrl || '/default-profile.png'}
            alt="Profile"
            onError={e => { e.target.onerror = null; e.target.src = '/default-profile.png'; }}
            className={`w-32 h-32 rounded-full object-cover border-4 border-cyan-400 mb-2 bg-slate-900 ${profile.bannerUrl ? '-mt-16' : 'mt-4'}`}
          />
            <h2 className="text-4xl font-extrabold mt-2 mb-1 text-white tracking-tight text-center drop-shadow-lg">{profile.stageName || profile.name}</h2>
            <div className="text-cyan-300 text-lg mb-1 font-semibold">@{profile.username}</div>
            <div className="flex flex-wrap gap-2 justify-center mb-2">
              <span className="px-3 py-1 rounded-full bg-cyan-900 text-cyan-200 text-sm font-semibold border border-cyan-700">{toSentenceCase(profile.artType)}</span>
              {profile.genre && <span className="px-3 py-1 rounded-full bg-cyan-900 text-cyan-200 text-sm font-semibold border border-cyan-700">{profile.genre}</span>}
              {profile.style && <span className="px-3 py-1 rounded-full bg-cyan-900 text-cyan-200 text-sm font-semibold border border-cyan-700">Style: {profile.style}</span>}
              {profile.producerTag && <span className="px-3 py-1 rounded-full bg-cyan-900 text-cyan-200 text-sm font-semibold border border-cyan-700">Producer Tag: {profile.producerTag}</span>}
              {profile.engineerTag && <span className="px-3 py-1 rounded-full bg-cyan-900 text-cyan-200 text-sm font-semibold border border-cyan-700">Engineer Tag: {profile.engineerTag}</span>}
              {profile.directedBy && <span className="px-3 py-1 rounded-full bg-cyan-900 text-cyan-200 text-sm font-semibold border border-cyan-700">Directed By: {profile.directedBy}</span>}
              {profile.designerStyle && <span className="px-3 py-1 rounded-full bg-cyan-900 text-cyan-200 text-sm font-semibold border border-cyan-700">Designer Style: {profile.designerStyle}</span>}
              {profile.skitmakerName && <span className="px-3 py-1 rounded-full bg-cyan-900 text-cyan-200 text-sm font-semibold border border-cyan-700">Skitmaker Name: {profile.skitmakerName}</span>}
              {profile.vixenName && <span className="px-3 py-1 rounded-full bg-cyan-900 text-cyan-200 text-sm font-semibold border border-cyan-700">Vixen Name: {profile.vixenName}</span>}
              {profile.shotBy && <span className="px-3 py-1 rounded-full bg-cyan-900 text-cyan-200 text-sm font-semibold border border-cyan-700">Shot By: {profile.shotBy}</span>}
            </div>
        </div>
        {/* Rating Placeholder */}
          <div className="mb-8 flex items-center justify-center bg-slate-800 rounded-xl p-4 border border-cyan-900">
          <FaStar className="text-yellow-400 text-2xl mr-2" />
            <span className="text-cyan-100 font-semibold text-lg">Average Rating: 4.8/5.0</span>
            <span className="ml-2 text-cyan-300 text-sm">(Ratings coming soon)</span>
        </div>
          {/* Request Collaboration CTA */}
          <div className="flex justify-center mb-8">
            <button
              type="button"
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-2 px-5 rounded-lg text-base shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
              onClick={() => setModalOpen(true)}
            >
              Work With This Creator
            </button>
          </div>
          {/* Modal (open/close logic, form content) */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" aria-modal="true" role="dialog" tabIndex={-1} ref={modalRef}>
              {/* Overlay: clicking this closes the modal */}
              <div className="fixed inset-0 z-40" onClick={closeModal} tabIndex={-1} aria-label="Close modal overlay" />
              {/* Modal content: clicking inside does NOT close the modal */}
              <div className="bg-slate-900 rounded-2xl shadow-xl p-6 w-full max-w-md relative animate-fade-in-slide-up focus:outline-none z-50" style={{ outline: 'none' }} onClick={e => e.stopPropagation()}>
                <button
                  className="absolute top-3 right-3 text-cyan-200 hover:text-white text-2xl font-bold focus:outline-none"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  &times;
                </button>
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
                    <h3 className="text-2xl font-bold text-cyan-100 mb-1 text-center">Work With {profile.stageName || profile.name}</h3>
                    <p className="text-cyan-300 text-sm mb-4 text-center">Fill out the form below to get started.</p>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-cyan-200 font-medium mb-1">Name<span className="text-red-400">*</span></label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className={`w-full rounded-lg border px-3 py-2 bg-slate-800 text-cyan-100 border-cyan-700 focus:ring-2 focus:ring-cyan-400 focus:outline-none ${errors.name ? 'border-red-500' : ''}`}
                        value={form.name}
                        onChange={handleChange}
                        required
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        disabled={submitting}
                      />
                      {errors.name && <div id="name-error" className="text-red-400 text-xs mt-1">{errors.name}</div>}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-cyan-200 font-medium mb-1">Email<span className="text-red-400">*</span></label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className={`w-full rounded-lg border px-3 py-2 bg-slate-800 text-cyan-100 border-cyan-700 focus:ring-2 focus:ring-cyan-400 focus:outline-none ${errors.email ? 'border-red-500' : ''}`}
                        value={form.email}
                        onChange={handleChange}
                        required
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        disabled={submitting}
                      />
                      {errors.email && <div id="email-error" className="text-red-400 text-xs mt-1">{errors.email}</div>}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="company" className="block text-cyan-200 font-medium mb-1">Company/Brand <span className="text-cyan-400 text-xs">(optional)</span></label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        className="w-full rounded-lg border px-3 py-2 bg-slate-800 text-cyan-100 border-cyan-700 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                        value={form.company}
                        onChange={handleChange}
                        disabled={submitting}
                      />
                    </div>
                    {/* Budget field (optional) */}
                    <div className="mb-4">
                      <label htmlFor="budget" className="block text-cyan-200 font-medium mb-1">Budget <span className="text-cyan-400 text-xs">(optional)</span></label>
                      <input
                        id="budget"
                        name="budget"
                        type="text"
                        className="w-full rounded-lg border px-3 py-2 bg-slate-800 text-cyan-100 border-cyan-700 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                        value={form.budget}
                        onChange={handleChange}
                        disabled={submitting}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="message" className="block text-cyan-200 font-medium mb-1">Message/Project Details<span className="text-red-400">*</span></label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className={`w-full rounded-lg border px-3 py-2 bg-slate-800 text-cyan-100 border-cyan-700 focus:ring-2 focus:ring-cyan-400 focus:outline-none resize-none ${errors.message ? 'border-red-500' : ''}`}
                        value={form.message}
                        onChange={handleChange}
                        required
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        disabled={submitting}
                      />
                      {errors.message && <div id="message-error" className="text-red-400 text-xs mt-1">{errors.message}</div>}
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-2 px-5 rounded-lg text-base shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={submitting}
                    >
                      {submitting ? 'Sending...' : 'Send Request'}
                    </button>
                    <div className="text-cyan-400 text-xs text-center mt-2">Kloud 9 will review your request and reach out to the creator to facilitate the next steps.</div>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-[220px] bg-gradient-to-br from-cyan-800 via-cyan-900 to-blue-900 rounded-2xl p-6 text-center animate-fade-in-slide-up">
                    <div className="flex items-center justify-center w-16 h-16 mb-4 bg-cyan-700 rounded-full shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">Thank you!</div>
                    <div className="text-cyan-100 text-base mb-2">We'll be in touch soon.</div>
                    <div className="text-cyan-300 text-sm mb-6">
                      Your request has been received.<br />
                      Kloud 9 will review it and reach out to the creator.
                    </div>
                    <button
                      className="mt-2 px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold text-base shadow hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 transition"
                      onClick={closeModal}
                      autoFocus
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Bio Section */}
        {profile.bio && (
            <div className="mb-8">
              <div className="font-semibold mb-2 text-cyan-200 border-b border-cyan-800 pb-1 text-lg">Bio</div>
            <BioSection bio={profile.bio} />
          </div>
        )}
        {/* Showcase section */}
        {profile.showcase && (
            <div className="mb-8 animate-fade-in-slide-up">
              <div className="font-semibold mb-2 text-cyan-200 border-b border-cyan-800 pb-1 text-lg">Showcase</div>
              {/* Card-based grid for platforms with horizontal scroll for links */}
            {(() => {
              // Music-related art types
              const musicTypes = [
                'musician',
                'beat producer',
                'songwriter',
                'mixing/mastering engineer',
              ];
              const musicPriority = ['spotify', 'appleMusic', 'youtube', 'audiomack'];
              // ART_TYPES mapping for other types
              const artTypeMap = {
                'graphics designer': ['behance', 'dribbble', 'instagram', 'portfolio'],
                'music video director': ['youtube', 'vimeo', 'instagram', 'tiktok'],
                'movie director': ['imdb', 'youtube', 'vimeo', 'portfolio'],
                'skitmaker': ['youtube', 'tiktok', 'instagram'],
                'video vixen': ['youtube', 'tiktok', 'instagram'],
                'other': ['custom1', 'custom2', 'custom3'],
              };
              const showcaseEntries = Object.entries(profile.showcase).filter(([k, v]) => typeof v === 'string' && v.startsWith('http'));
              // Group links by platform (removing trailing numbers)
              const platformGroups = {};
              for (const [k, v] of showcaseEntries) {
                const plat = k.replace(/\d+$/, '');
                if (!platformGroups[plat]) platformGroups[plat] = [];
                platformGroups[plat].push([k, v]);
              }
              // Determine prioritized platforms
              let prioritizedPlatforms = [];
              if (musicTypes.includes(profile.artType)) {
                prioritizedPlatforms = musicPriority.filter(plat => platformGroups[plat]);
              } else {
                const arr = artTypeMap[profile.artType] || [];
                prioritizedPlatforms = arr.filter(plat => platformGroups[plat]);
              }
              // Fill up to 3 with any other platforms
              const allPlatforms = Object.keys(platformGroups);
              for (const plat of allPlatforms) {
                if (prioritizedPlatforms.length === 3) break;
                if (!prioritizedPlatforms.includes(plat)) {
                  prioritizedPlatforms.push(plat);
                }
              }
              prioritizedPlatforms = prioritizedPlatforms.slice(0, 3);
              // Find all links not included in the prioritized platform cards
              const prioritizedSet = new Set();
              prioritizedPlatforms.forEach(plat => {
                platformGroups[plat].slice(0, 3).forEach(([k]) => prioritizedSet.add(k));
              });
              const otherLinks = showcaseEntries.filter(([k]) => !prioritizedSet.has(k));
              return (
                <>
                  <div className="flex flex-col gap-6 mb-6">
                      {prioritizedPlatforms.map(plat => {
                        // Separate embeddable and non-embeddable links
                        const embeddable = platformGroups[plat].slice(0, 3).filter(([_, v]) => (
                          plat === 'youtube' || plat === 'soundcloud' || plat === 'spotify' || plat === 'vimeo'
                        ));
                        const nonEmbeddable = platformGroups[plat].slice(0, 3).filter(([_, v]) => !(
                          plat === 'youtube' || plat === 'soundcloud' || plat === 'spotify' || plat === 'vimeo'
                        ));
                        const onlyNonEmbeddable = embeddable.length === 0 && nonEmbeddable.length > 0;
                        // For onlyNonEmbeddable, group links by platform
                        let groupedNonEmbeddable = {};
                        if (onlyNonEmbeddable) {
                          platformGroups[plat].slice(0, 3).forEach(([k, v]) => {
                            const platKey = plat;
                            if (!groupedNonEmbeddable[platKey]) groupedNonEmbeddable[platKey] = [];
                            groupedNonEmbeddable[platKey].push([k, v]);
                          });
                        }
                        return (
                          <div
                            key={plat}
                            className="w-full bg-gray-800 rounded-2xl shadow p-4 border-2 transition-all duration-200 flex flex-col items-center hover:shadow-xl hover:border-cyan-400"
                            style={{ borderColor: platformIcons[plat]?.props?.className?.includes('text-') ? undefined : '#22d3ee' }}
                          >
                            {/* Card Title */}
                            <div className="flex items-center gap-2 mb-3 w-full">
                              {onlyNonEmbeddable ? (
                                <span className="font-semibold text-cyan-200 text-lg">Other Links</span>
                              ) : (
                                <>
                                  {platformIcons[plat] || <FaLink className="inline text-cyan-400 text-xl" />}
                                  <span className="font-semibold text-cyan-200 text-lg">{plat.charAt(0).toUpperCase() + plat.slice(1)}</span>
                                </>
                              )}
                            </div>
                            {/* Embeddable links horizontal scroll */}
                            {embeddable.length > 0 && (
                              <div className="flex gap-4 overflow-x-auto w-full pb-2 mb-2" style={{ WebkitOverflowScrolling: 'touch' }}>
                                {embeddable.map(([k, v]) => (
                                  <div key={k} className="flex-shrink-0 w-[260px]">
                                    <ShowcaseEmbed platform={plat} link={v} />
                                  </div>
                                ))}
                              </div>
                            )}
                            {/* Non-embeddable links as pills under 'Other Links' */}
                            {nonEmbeddable.length > 0 && (
                              <div className="w-full mt-2">
                                {onlyNonEmbeddable ? (
                                  <>
                                    {Object.entries(groupedNonEmbeddable).map(([platKey, links], idx) => (
                                      <div key={platKey} className={idx > 0 ? 'mt-4 pt-4 border-t border-cyan-800' : ''}>
                                        <div className="flex items-center gap-2 text-cyan-300 text-sm font-semibold mb-1">
                                          {platformIcons[platKey] || <FaLink className="inline text-cyan-400 text-base" />}
                                          <span>{platKey.charAt(0).toUpperCase() + platKey.slice(1)}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                          {links.map(([k, v]) => (
                                            <a
                                              key={k}
                                              href={v}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="px-4 py-2 rounded-full bg-cyan-900 text-cyan-100 font-medium border border-cyan-700 hover:bg-cyan-700 hover:text-white transition-all text-sm shadow block text-center"
                                            >
                                              {v.includes('behance.net') ? (
                                                <span className="inline-flex items-center gap-1">
                                                  {/* Behance icon */}
                                                  Behance
                                                </span>
                                              ) : v.includes('dribbble.com') ? (
                                                <span className="inline-flex items-center gap-1">
                                                  {/* Dribbble icon */}
                                                  Dribbble
                                                </span>
                                              ) : v.includes('instagram.com') ? (
                                                <span className="inline-flex items-center gap-1">
                                                  {/* Instagram icon */}
                                                  Instagram
                                                </span>
                                              ) : v.includes('imdb.com') ? (
                                                <span className="inline-flex items-center gap-1">
                                                  {/* IMDb icon */}
                                                  IMDb
                                                </span>
                                              ) : (
                                                <span className="inline-flex items-center gap-1">
                                                  {/* Link icon */}
                                                  Link
                                                </span>
                                              )}
                                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                                  </>
                                ) : (
                                  <div className="text-cyan-300 text-sm font-semibold mb-1">Other Links</div>
                                )}
                                {!onlyNonEmbeddable && (
                                  <div className="flex flex-wrap gap-2">
                                    {nonEmbeddable.map(([k, v]) => (
                                      <a
                                        key={k}
                                        href={v}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 rounded-full bg-cyan-900 text-cyan-100 font-medium border border-cyan-700 hover:bg-cyan-700 hover:text-white transition-all text-sm shadow block text-center"
                                      >
                                        {v.includes('behance.net') ? (
                                          <span className="inline-flex items-center gap-1">
                                            {/* Behance icon */}
                                            Behance
                                          </span>
                                        ) : v.includes('dribbble.com') ? (
                                          <span className="inline-flex items-center gap-1">
                                            {/* Dribbble icon */}
                                            Dribbble
                                          </span>
                                        ) : v.includes('instagram.com') ? (
                                          <span className="inline-flex items-center gap-1">
                                            {/* Instagram icon */}
                                            Instagram
                                          </span>
                                        ) : v.includes('imdb.com') ? (
                                          <span className="inline-flex items-center gap-1">
                                            {/* IMDb icon */}
                                            IMDb
                                          </span>
                                        ) : (
                                          <span className="inline-flex items-center gap-1">
                                            {/* Link icon */}
                                            Link
                                          </span>
                                        )}
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                  {otherLinks.length > 0 && (
                    <div className="mt-4">
                        <div className="font-semibold text-cyan-200 mb-2 text-lg">Other Links</div>
                      <div className="flex flex-col gap-2">
                        {otherLinks.map(([platform, link]) => (
                          <a
                            key={platform}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                              className="block bg-gray-800 rounded-lg p-3 text-cyan-100 hover:bg-cyan-900 transition"
                          >
                              {platformIcons[platform.replace(/\d+$/, '')] || <span className="inline mr-2 text-cyan-400">🔗</span>}
                            {platform.charAt(0).toUpperCase() + platform.slice(1)}: {link}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}
        {/* Social Sharing Buttons (moved to bottom) */}
        <div className="flex flex-col items-center gap-2 mt-10 mb-2 animate-fade-in-slide-up" style={{ animationDelay: '60ms' }}>
          <span className="text-cyan-200 text-sm font-semibold">Share to:</span>
          <div className="flex justify-center gap-4">
            {(() => {
              const profileUrl = `https://yourdomain.com/profile/${profile.username}`;
              const shareText = encodeURIComponent(`Check out ${profile.stageName || profile.name}'s profile on Kloud-9!`);
              return (
                <>
                  <a
                    href={`https://www.threads.net/intent/post?url=${encodeURIComponent(profileUrl)}&text=${shareText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Threads"
                    className="hover:text-cyan-400 text-2xl transition"
                    style={{ color: '#5851DB' }}
                  >
                    <SiThreads />
                  </a>
                  <a
                    href={`https://x.com/intent/tweet?url=${encodeURIComponent(profileUrl)}&text=${shareText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on X"
                    className="hover:text-cyan-400 text-2xl transition text-black dark:text-white"
                  >
                    <SiX />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                    className="hover:text-cyan-400 text-2xl transition"
                    style={{ color: '#1877F3' }}
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(profileUrl)}&title=${shareText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    className="hover:text-cyan-400 text-2xl transition"
                    style={{ color: '#0A66C2' }}
                  >
                    <FaLinkedin />
                  </a>
                </>
              );
            })()}
          </div>
        </div>
      </div>
      </div>
      
      <Footer />
    </div>
  );
} 