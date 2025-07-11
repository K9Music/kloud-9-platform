'use client';
import { useState, useEffect } from 'react';
import { FaSpotify, FaYoutube, FaSoundcloud, FaApple, FaMusic, FaLink, FaEye, FaEyeSlash, FaInstagram, FaTiktok, FaImage, FaCamera } from 'react-icons/fa';
// Simulated registered usernames (replace with API call in production)
const REGISTERED_USERNAMES = ['john', 'jane', 'beatking', 'vixenchic'];
const PLATFORM_ICONS = {
  spotify: <FaSpotify className="inline text-green-500 mr-1" />,
  youtube: <FaYoutube className="inline text-red-500 mr-1" />,
  soundcloud: <FaSoundcloud className="inline text-orange-500 mr-1" />,
  appleMusic: <FaApple className="inline text-pink-500 mr-1" />,
  audiomack: <FaMusic className="inline text-yellow-500 mr-1" />,
tiktok: <FaTiktok className="inline text-black mr-1" />,
  beatstars: <FaMusic className="inline text-red-700 mr-1" />,
  custom1: <FaLink className="inline text-blue-500 mr-1" />,
  custom2: <FaLink className="inline text-blue-500 mr-1" />,
  custom3: <FaLink className="inline text-blue-500 mr-1" />,
instagram: <FaInstagram className="inline text-pink-500 mr-1" />,
vimeo: <FaLink className="inline text-blue-500 mr-1" />,
behance: <FaLink className="inline text-blue-500 mr-1" />,
dribbble: <FaLink className="inline text-blue-500 mr-1" />,
imdb: <FaLink className="inline text-blue-500 mr-1" />,
portfolio: <FaLink className="inline text-blue-500 mr-1" />,
};
const ART_TYPES = [
  { value: 'musician', label: 'Musician', showcases: ['spotify', 'appleMusic', 'youtube', 'soundcloud', 'audiomack', 'tiktok'] },
{ value: 'beat producer', label: 'Beat Producer', showcases: ['spotify', 'appleMusic', 'youtube', 'soundcloud', 'audiomack', 'tiktok', 'beatstars'] },
  { value: 'songwriter', label: 'Songwriter', showcases: ['spotify', 'appleMusic', 'youtube', 'soundcloud', 'audiomack', 'tiktok'] },
{ value: 'mixing/mastering engineer', label: 'Mixing/Mastering Engineer', showcases: ['spotify', 'appleMusic', 'youtube', 'soundcloud', 'audiomack', 'tiktok'] },
{ value: 'graphics designer', label: 'Graphics Designer', showcases: ['behance', 'dribbble', 'instagram', 'portfolio'] },
{ value: 'music video director', label: 'Music Video Director', showcases: ['youtube', 'vimeo', 'instagram', 'tiktok'] },
{ value: 'movie director', label: 'Movie Director', showcases: ['imdb', 'youtube', 'vimeo', 'portfolio'] },
{ value: 'skitmaker', label: 'Skitmaker', showcases: ['youtube', 'tiktok', 'instagram'] },
{ value: 'video vixen', label: 'Video Vixen', showcases: ['youtube', 'tiktok', 'instagram'] },
  { value: 'other', label: 'Other', showcases: ['custom1', 'custom2', 'custom3'] },
];
const GENRE_OPTIONS = [
  'Afrobeat', 'Hip Hop', 'Pop', 'R&B', 'Jazz', 'Classical', 'Rock', 'Reggae', 'Gospel', 'Electronic', 'Folk', 'Country', 'Soul', 'Trap', 'Dancehall', 'Amapiano', 'Highlife', 'Fuji', 'Other'
];
// Only relevant for graphics designers
const DESIGN_STYLE_OPTIONS = [
'Digital', 'Painting', 'Illustration', 'Vector', '3D', 'Animation', 'Typography', 'Branding', 'UI/UX', 'Collage', 'Mixed Media', 'Calligraphy', 'Logo', 'Print', 'Web', 'Other'
];
const STYLE_OPTIONS = [
...DESIGN_STYLE_OPTIONS,
'Vocal', 'Instrumental', 'Live', 'Studio', 'Experimental', 'Traditional', 'Modern', 'Fusion', 'Acoustic', 'Freestyle', 'Cover', 'Remix', 'Original'
];
export default function CreateProfilePage() {
  const [form, setForm] = useState({
    username: '',
password: '',
confirmPassword: '',
    name: '',
email: '',
artType: '',
    stageName: '',
    genre: '',
    style: '',
    bio: '',
    photoUrl: '',
    bannerUrl: '',
    showcase: {},
producerTag: '',
engineerTag: '',
directedBy: '',
designerStyle: '',
skitmakerName: '',
vixenName: '',
  });
  const [message, setMessage] = useState('');
  const [genreSuggestions, setGenreSuggestions] = useState([]);
  const [styleSuggestions, setStyleSuggestions] = useState([]);
const [designerStyleSuggestions, setDesignerStyleSuggestions] = useState([]);
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [showPasswordChecklist, setShowPasswordChecklist] = useState(false);
const [usernameTaken, setUsernameTaken] = useState(false);
const [photoPreview, setPhotoPreview] = useState('');
const [bannerPreview, setBannerPreview] = useState('');
const GENRE_EXAMPLES = 'e.g. Afrobeat, Hip Hop, Pop';
const DESIGN_STYLE_EXAMPLES = 'e.g. Digital, Painting, Illustration';
const passwordRequirements = [
{ label: "At least 8 characters", test: (pw) => pw.length >= 8 },
{ label: "At least one uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
{ label: "At least one lowercase letter", test: (pw) => /[a-z]/.test(pw) },
{ label: "At least one number", test: (pw) => /\d/.test(pw) },
];
useEffect(() => {
if (form.username.trim() && REGISTERED_USERNAMES.includes(form.username.trim().toLowerCase())) {
setUsernameTaken(true);
} else {
setUsernameTaken(false);
}
}, [form.username]);
useEffect(() => {
if (form.genre) {
setGenreSuggestions(
GENRE_OPTIONS.filter(
(g) => g.toLowerCase().includes(form.genre.toLowerCase()) && g.toLowerCase() !== form.genre.toLowerCase()
)
);
} else {
setGenreSuggestions([]);
}
}, [form.genre]);
useEffect(() => {
// Only show relevant style suggestions for graphics designer
if (form.artType === 'graphics designer' && form.designerStyle) {
setDesignerStyleSuggestions(
DESIGN_STYLE_OPTIONS.filter(
(s) => s.toLowerCase().includes(form.designerStyle.toLowerCase()) && s.toLowerCase() !== form.designerStyle.toLowerCase()
)
);
} else {
setDesignerStyleSuggestions([]);
}
if (form.style && form.artType !== 'graphics designer') {
setStyleSuggestions(
STYLE_OPTIONS.filter(
(s) => s.toLowerCase().includes(form.style.toLowerCase()) && s.toLowerCase() !== form.style.toLowerCase()
)
);
} else {
setStyleSuggestions([]);
}
}, [form.style, form.designerStyle, form.artType]);
// Image upload logic (simulate Cloudinary or use your own API)
const handleImageUpload = async (e, type) => {
const file = e.target.files[0];
if (!file) return;
const reader = new FileReader();
reader.onloadend = () => {
if (type === 'photo') {
setPhotoPreview(reader.result);
setForm((prev) => ({ ...prev, photoUrl: reader.result }));
} else {
setBannerPreview(reader.result);
setForm((prev) => ({ ...prev, bannerUrl: reader.result }));
}
};
reader.readAsDataURL(file);
};
const getOptionalFields = (artType) => {
switch (artType) {
case 'musician':
return ['genre', 'stageName'];
case 'beat producer':
return ['genre', 'producerTag'];
case 'mixing/mastering engineer':
return ['engineerTag'];
case 'music video director':
case 'movie director':
return ['directedBy'];
case 'graphics designer':
return ['designerStyle'];
case 'songwriter':
return ['genre'];
case 'skitmaker':
return ['skitmakerName'];
case 'video vixen':
return ['vixenName'];
default:
return [];
}
};
const getShowcasePlatforms = (artType) => {
const type = ART_TYPES.find((t) => t.value === artType);
return type ? type.showcases : [];
};
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleShowcaseChange = (platform, idx, value) => {
    setForm((prev) => ({
      ...prev,
      showcase: { ...prev.showcase, [`${platform}${idx > 0 ? idx + 1 : ''}`]: value },
    }));
  };

const handleRemoveShowcase = (platform, idx) => {
  setForm((prev) => {
    const showcase = { ...prev.showcase };
    delete showcase[`${platform}${idx > 0 ? idx + 1 : ''}`];
    return { ...prev, showcase };
    });
  };

const handleAddShowcase = (platform) => {
  setForm((prev) => {
    const showcase = { ...prev.showcase };
    let count = 1;
    while (showcase[`${platform}${count > 1 ? count : ''}`]) {
      count++;
    }
    showcase[`${platform}${count > 1 ? count : ''}`] = '';
    return { ...prev, showcase };
  });
};

// Custom Links logic
const handleCustomLinkChange = (idx, value) => {
  setForm((prev) => ({
    ...prev,
    showcase: { ...prev.showcase, [`custom${idx + 1}`]: value },
  }));
};

const handleAddCustomLink = () => {
  setForm((prev) => {
    const showcase = { ...prev.showcase };
    let count = 1;
    while (showcase[`custom${count}`]) {
      count++;
    }
    showcase[`custom${count}`] = '';
    return { ...prev, showcase };
  });
};

const handleRemoveCustomLink = (idx) => {
  setForm((prev) => {
    const showcase = { ...prev.showcase };
    delete showcase[`custom${idx + 1}`];
    return { ...prev, showcase };
  });
};
const passwordChecklistMet = passwordRequirements.map((req) => req.test(form.password));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
if (usernameTaken) {
setMessage('Username is already taken.');
return;
}
// Example: send to your API route
    try {
      const res = await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
setMessage('Profile submitted successfully!');
      } else {
        const data = await res.json();
setMessage(data.error || 'Server error.');
      }
    } catch (err) {
setMessage('Server error.');
    }
  };
  return (
<div className="min-h-screen bg-gradient-to-br from-black via-orange-900 to-teal-900 flex items-center justify-center bg-fixed bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))]">
<form onSubmit={handleSubmit} autoComplete="off" className="w-full max-w-3xl mx-auto p-8 bg-gray-900 rounded-lg shadow-lg text-orange-100">
<h2 className="text-2xl font-bold mb-4">Create Your Profile</h2>
        {/* Profile Photo Upload */}
        <div className="mb-4 flex flex-col items-center">
          <div className="relative w-24 h-24">
            {photoPreview || form.photoUrl ? (
              <img
                src={photoPreview || form.photoUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-orange-400 bg-gray-800"
              />
            ) : (
              <div className="w-24 h-24 rounded-full flex items-center justify-center border-2 border-orange-400 bg-gray-800">
                <FaCamera className="text-3xl text-orange-300" aria-label="Add profile photo" />
              </div>
            )}
            <label className="absolute bottom-2 right-2 bg-black/60 rounded-full p-2 cursor-pointer">
              <input
                type="file"
                name="photoUrl"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'photo')}
                className="hidden"
              />
              <FaCamera className="text-white" />
            </label>
          </div>
          <span className="text-sm text-orange-200 mt-2">Change Profile Photo</span>
        </div>
        {/* Banner Image Upload */}
        <div className="mb-4">
          <div className="relative w-full h-32">
            {bannerPreview || form.bannerUrl ? (
              <img
                src={bannerPreview || form.bannerUrl}
                alt="Banner"
                className="w-full h-32 object-cover rounded-lg border-2 border-orange-400 bg-gray-800"
              />
            ) : (
              <div className="w-full h-32 flex items-center justify-center rounded-lg border-2 border-orange-400 bg-gray-800">
                <FaCamera className="text-3xl text-orange-300" aria-label="Add banner image" />
              </div>
            )}
            <label className="absolute bottom-2 right-2 bg-black/60 rounded-full p-2 cursor-pointer">
              <input
                type="file"
                name="bannerUrl"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'banner')}
                className="hidden"
              />
              <FaCamera className="text-white" />
            </label>
          </div>
          <span className="text-sm text-orange-200 mt-2">Change Banner Image <span className="text-xs text-orange-300">(optional)</span></span>
        </div>
        {/* Username */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={form.username}
            onChange={handleChange}
            className={`block w-full p-3 rounded-lg border ${usernameTaken ? 'border-red-500' : 'border-gray-300'} bg-gray-800 text-orange-100 focus:ring-2 focus:ring-orange-400`}
            required
          />
          {usernameTaken && (
            <p className="text-red-400 text-sm mt-1">This username is already taken.</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label className="block mb-1 font-semibold" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              onFocus={() => setShowPasswordChecklist(true)}
              onBlur={() => setShowPasswordChecklist(false)}
              className="block w-full p-3 rounded-lg border border-gray-300 bg-gray-800 text-orange-100 focus:ring-2 focus:ring-orange-400 pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-300"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {showPasswordChecklist && (
            <div className="mt-2 bg-gray-800 p-3 rounded-lg shadow text-sm">
              <p className="mb-1 font-semibold">Password must have:</p>
              <ul>
                {passwordRequirements.map((req, idx) => (
                  <li key={idx} className="flex items-center">
                    <span
                      className={`inline-block w-3 h-3 rounded-full mr-2 border-2 ${req.test(form.password) ? 'bg-orange-500 border-orange-500' : 'bg-gray-700 border-gray-500'}`}
                    ></span>
                    {req.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`block w-full p-3 rounded-lg border pr-10 bg-gray-800 text-orange-100 ${
                form.confirmPassword
                  ? form.password === form.confirmPassword
                    ? 'border-green-500 focus:ring-green-400'
                    : 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-blue-400'
              }`}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-300"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            className="block w-full p-3 rounded-lg border border-gray-300 bg-gray-800 text-orange-100 focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            className="block w-full p-3 rounded-lg border border-gray-300 bg-gray-800 text-orange-100 focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        {/* Art Type */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="artType">
            Art Type
          </label>
          <select
            name="artType"
            id="artType"
            value={form.artType}
            onChange={handleChange}
            className="block w-full p-3 rounded-lg border border-gray-300 bg-gray-800 text-orange-100 focus:ring-2 focus:ring-orange-400"
            required
          >
            <option value="">Select art type</option>
            {ART_TYPES.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="bio">
            Bio
          </label>
          <textarea
            name="bio"
            id="bio"
            value={form.bio}
            onChange={handleChange}
            className="block w-full p-3 rounded-lg border border-gray-300 bg-gray-800 text-orange-100 focus:ring-2 focus:ring-orange-400"
            rows={3}
            placeholder="Tell us about yourself"
            required
          />
        </div>

        {/* Conditionally Rendered Optional Fields */}
        {getOptionalFields(form.artType).includes('stageName') && (
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="stageName">
              Stage Name <span className="text-xs text-orange-300">(optional)</span>
            </label>
            <input
              type="text"
              name="stageName"
              id="stageName"
              value={form.stageName}
              onChange={handleChange}
              className="block w-full p-3 rounded-lg border border-gray-300 bg-gray-800 text-orange-100 focus:ring-2 focus:ring-orange-400"
              placeholder="e.g. Wizkid"
            />
          </div>
        )}

        {getOptionalFields(form.artType).includes('genre') && (
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="genre">
              Genre <span className="text-xs text-orange-300">(optional)</span>
            </label>
            <input
              type="text"
              name="genre"
              id="genre"
              value={form.genre}
              onChange={handleChange}
              className="block w-full p-3 rounded-lg border border-gray-300 bg-gray-800 text-orange-100 focus:ring-2 focus:ring-orange-400"
              placeholder={GENRE_EXAMPLES}
              autoComplete="off"
            />
            {genreSuggestions.length > 0 && (
              <ul className="bg-gray-900 border border-gray-700 rounded-lg mt-1 text-orange-100">
                {genreSuggestions.map((g, idx) => (
                  <li
                    key={idx}
                    className="px-3 py-1 cursor-pointer hover:bg-orange-700"
                    onClick={() => setForm({ ...form, genre: g })}
                  >
                    {g}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {getOptionalFields(form.artType).includes('producerTag') && (
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="producerTag">
              Producer Tag <span className="text-xs text-orange-300">(optional)</span>
            </label>
            <input
              type="text"
              name="producerTag"
              id="producerTag"
              value={form.producerTag}
              onChange={handleChange}
              className="block w-full p-3 rounded-lg border border-gray-300 bg-gray-800 text-orange-100 focus:ring-2 focus:ring-orange-400"
              placeholder="e.g. It's XYZ on the beat"
            />
          </div>
        )}

        {getOptionalFields(form.artType).includes('engineerTag') && (
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="engineerTag">
              Engineer Tag <span className="text-xs text-orange-300">(optional)</span>
            </label>
            <input
              type="text"
              name="engineerTag"
              id="engineerTag"
              value={form.engineerTag}
              onChange={handleChange}
              className="block w-full p-3 rounded-lg border border-gray-300 bg-gray-800 text-orange-100 focus:ring-2 focus:ring-orange-400"
              placeholder="e.g. Mixed by XYZ"
            />
          </div>
        )}

        {getOptionalFields(form.artType).includes('directedBy') && (
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="directedBy">
              Directed By <span className="text-xs text-orange-300">(optional)</span>
            </label>
            <input
              type="text"
              name="directedBy"
              id="directedBy"
              value={form.directedBy}
              onChange={handleChange}
              className="block w-full p-3 rounded-lg border border-gray-300 bg-gray-800 text-orange-100 focus:ring-2 focus:ring-orange-400"
              placeholder="e.g. Directed by XYZ"
            />
          </div>
        )}

        {getOptionalFields(form.artType).includes('designerStyle') && (
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="designerStyle">
              Style <span className="text-xs text-orange-300">(optional)</span>
            </label>
            <input
              type="text"
              name="designerStyle"
              id="designerStyle"
              value={form.designerStyle}
              onChange={handleChange}
              className="block w-full p-3 rounded-lg border border-gray-300 bg-gray-800 text-orange-100 focus:ring-2 focus:ring-orange-400"
              placeholder={DESIGN_STYLE_EXAMPLES}
              autoComplete="off"
            />
            {designerStyleSuggestions.length > 0 && (
              <ul className="bg-gray-900 border border-gray-700 rounded-lg mt-1 text-orange-100">
                {designerStyleSuggestions.map((s, idx) => (
                  <li
                    key={idx}
                    className="px-3 py-1 cursor-pointer hover:bg-orange-700"
                    onClick={() => setForm({ ...form, designerStyle: s })}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {getOptionalFields(form.artType).includes('skitmakerName') && (
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="skitmakerName">
              Skitmaker Name <span className="text-xs text-orange-300">(optional)</span>
            </label>
            <input
              type="text"
              name="skitmakerName"
              id="skitmakerName"
              value={form.skitmakerName}
              onChange={handleChange}
              className="block w-full p-3 rounded-lg border border-gray-300 bg-gray-800 text-orange-100 focus:ring-2 focus:ring-orange-400"
              placeholder="e.g. Mr. Macaroni"
            />
          </div>
        )}

        {getOptionalFields(form.artType).includes('vixenName') && (
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="vixenName">
              Vixen Name <span className="text-xs text-orange-300">(optional)</span>
            </label>
            <input
              type="text"
              name="vixenName"
              id="vixenName"
              value={form.vixenName}
              onChange={handleChange}
              className="block w-full p-3 rounded-lg border border-gray-300 bg-gray-800 text-orange-100 focus:ring-2 focus:ring-orange-400"
              placeholder="e.g. Vixen Queen"
            />
          </div>
        )}

        {form.artType && (
<div className="mb-4">
<label className="block mb-1 font-semibold">
Showcase Your Work
</label>
<p className="text-orange-200 text-sm mb-2">
Add links to your works on any of these platforms. If your platform is not listed, use the "Other Platform" option below.
</p>
{/* Platform checkboxes */}
<div className="flex flex-wrap gap-4 mb-4">
{[
...getShowcasePlatforms(form.artType),
'otherPlatform'
].map((platform) => (
<label key={platform} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer shadow bg-gray-800 text-gray-200">
          <input
  type="checkbox"
  checked={form.showcase[`${platform}Checked`] || false}
  onChange={() => {
    setForm((prev) => {
      const checked = !prev.showcase[`${platform}Checked`];
      const showcase = { ...prev.showcase, [`${platform}Checked`]: checked };
      // If checking, ensure at least one link field exists
      if (checked && showcase[platform] === undefined) {
        showcase[platform] = '';
      }
      return { ...prev, showcase };
    });
  }}
  className="accent-orange-500 w-5 h-5"
/>
{platform === 'otherPlatform'
? <FaLink className="inline text-blue-500 mr-1" />
: (PLATFORM_ICONS[platform] || <FaLink className="inline text-blue-500 mr-1" />)}
<span className="font-semibold">
{platform === 'otherPlatform'
? 'Other Platform'
: platform.charAt(0).toUpperCase() + platform.slice(1)}
</span>
                  </label>
))}
</div>
{/* Platform link fields with labels and dividers */}
{[...getShowcasePlatforms(form.artType), 'otherPlatform'].map((platform, i, arr) =>
  form.showcase[`${platform}Checked`] ? (
    <div key={platform} className="mb-2">
      <div className="flex items-center gap-2 mb-1">
        {platform === 'otherPlatform'
          ? <FaLink className="inline text-blue-500 mr-1" />
          : (PLATFORM_ICONS[platform] || <FaLink className="inline text-blue-500 mr-1" />)}
        <span className="font-semibold">
          {platform === 'otherPlatform'
            ? 'Other Platform'
            : platform.charAt(0).toUpperCase() + platform.slice(1)}
        </span>
      </div>
      {[0, 1, 2].map((idx) =>
        form.showcase[`${platform}${idx > 0 ? idx + 1 : ''}`] !== undefined ||
        (idx === 0 && form.showcase[platform] !== undefined)
          ? (
            <div key={platform + idx} className="flex items-center gap-2 mb-2">
                  <input
                    type="url"
  placeholder={
    platform === 'otherPlatform'
      ? 'Paste a link to your work on another platform'
      : `Paste a link to your work on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`
  }
  value={form.showcase[`${platform}${idx > 0 ? idx + 1 : ''}`] !== undefined
    ? form.showcase[`${platform}${idx > 0 ? idx + 1 : ''}`]
    : form.showcase[platform] || ''}
  onChange={(e) =>
    handleShowcaseChange(
      platform,
      idx,
      e.target.value
    )
  }
  className="block w-full p-3 rounded-lg border border-gray-300 bg-gray-800 text-orange-100 focus:ring-2 focus:ring-orange-400"
  required
/>
              {idx > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveShowcase(platform, idx)}
                  className="text-red-400 hover:text-red-600 text-lg font-bold"
                >
                  &times;
                </button>
              )}
            </div>
          ) : null
      )}
      {Object.keys(form.showcase).filter((key) =>
        key.startsWith(platform) && !key.endsWith('Checked')
      ).length < 3 && (
        <button
          type="button"
          onClick={() => handleAddShowcase(platform)}
          className="text-orange-400 hover:text-orange-600 text-sm font-semibold"
        >
          + Add another link
        </button>
      )}
      {/* Divider after each platform except the last visible one */}
      {(() => {
        // Find all checked platforms
        const checkedPlatforms = [...getShowcasePlatforms(form.artType), 'otherPlatform'].filter(
          (p) => form.showcase[`${p}Checked`]
        );
        // Only show divider if this is not the last checked platform
        return checkedPlatforms[checkedPlatforms.length - 1] !== platform ? (
          <div className="my-4 border-t border-orange-800 opacity-40 w-2/3 mx-auto" />
        ) : null;
      })()}
    </div>
  ) : null
)}
                </div>
            )}

        {/* Submit Button */}
          <button
            type="submit"
          className="w-full py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg transition"
          >
            Create Profile
          </button>

        {/* Message */}
        {message && (
          <div className="mt-4 text-center font-semibold text-orange-300">
            {message}
          </div>
        )}
        </form>
    </div>
  );
}