'use client';
import { useState, useEffect } from 'react';
import { FaSpotify, FaYoutube, FaSoundcloud, FaApple, FaMusic, FaLink, FaEye, FaEyeSlash, FaInstagram, FaTiktok, FaImage, FaCamera, FaChevronLeft, FaChevronRight, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { uploadToCloudinary } from '../../lib/cloudinary';
import { sanitizeObject, isValidProfileInput } from '../../lib/validation';
import { useRouter } from 'next/navigation';
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
pinterest: <FaLink className="inline text-red-600 mr-1" />,
'500px': <FaLink className="inline text-blue-500 mr-1" />,
flickr: <FaLink className="inline text-pink-500 mr-1" />,
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
{ value: 'photographer', label: 'Photographer', showcases: ['instagram', 'pinterest', 'behance', 'portfolio', '500px', 'flickr'] },
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

const STEPS = [
  'Account Details',
  'Profile Details',
  'Showcase',
  'Confirmation'
];

// Utility to convert a string to title case (each word capitalized)
function toSentenceCase(str) {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

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
shotBy: '',
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
const [submitting, setSubmitting] = useState(false);
const [step, setStep] = useState(0);
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 30;
const USERNAME_REGEX = /^[a-z0-9_]+$/; // Only lowercase letters, numbers, underscores
const [customArtType, setCustomArtType] = useState('');
const [customArtTypeError, setCustomArtTypeError] = useState('');

const validateCustomArtType = (value) => {
  if (!value) return 'Please enter your art type.';
  if (value.length < 3) return 'Art type must be at least 3 characters.';
  if (value.length > 40) return 'Art type cannot exceed 40 characters.';
  if (!/^[a-zA-Z\s\-']+$/.test(value)) return 'Only letters, spaces, hyphens, and apostrophes are allowed.';
  return '';
};

const getUsernameValidationError = (username) => {
  if (!username) return 'Username is required.';
  if (username.length < USERNAME_MIN_LENGTH) return `Username must be at least ${USERNAME_MIN_LENGTH} characters.`;
  if (username.length > USERNAME_MAX_LENGTH) return `Username cannot exceed ${USERNAME_MAX_LENGTH} characters.`;
  if (!USERNAME_REGEX.test(username)) return 'Usernames can only contain lowercase letters, numbers, and underscores (_). No spaces or dashes.';
  return '';
};
const [usernameError, setUsernameError] = useState('');
const [showUsernameHelp, setShowUsernameHelp] = useState(false);
const [showEmailHelp, setShowEmailHelp] = useState(false);
const [showPasswordHelp, setShowPasswordHelp] = useState(false);
const [showConfirmPasswordHelp, setShowConfirmPasswordHelp] = useState(false);
const [showNameHelp, setShowNameHelp] = useState(false);
const [showArtTypeHelp, setShowArtTypeHelp] = useState(false);
const [showBioHelp, setShowBioHelp] = useState(false);

useEffect(() => {
if (form.username.trim() && REGISTERED_USERNAMES.includes(form.username.trim().toLowerCase())) {
setUsernameTaken(true);
} else {
setUsernameTaken(false);
}
  setUsernameError(getUsernameValidationError(form.username));
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
  try {
    // Show a preview while uploading (optional)
    const preview = URL.createObjectURL(file);
    if (type === 'photo') setPhotoPreview(preview);
    else setBannerPreview(preview);

    // Upload to Cloudinary
    const url = await uploadToCloudinary(file, type);
if (type === 'photo') {
      setPhotoPreview(url);
      setForm((prev) => ({ ...prev, photoUrl: url }));
} else {
      setBannerPreview(url);
      setForm((prev) => ({ ...prev, bannerUrl: url }));
    }
  } catch (err) {
    alert('Image upload failed. Please try again.');
  }
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
case 'photographer':
return ['shotBy'];
default:
return [];
}
};
const getShowcasePlatforms = (artType) => {
const type = ART_TYPES.find((t) => t.value === artType);
return type ? type.showcases : [];
};
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      const lower = value.toLowerCase();
      setForm({ ...form, [name]: lower });
      setUsernameError(getUsernameValidationError(lower));
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const [emailError, setEmailError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [showcaseErrors, setShowcaseErrors] = useState({});

  const validateEmail = (email) => {
    if (!email) return 'Email is required.';
    // Simple email regex for demonstration
    if (!/^\S+@\S+\.\S+$/.test(email)) return 'Please enter a valid email address.';
    return '';
  };

  const validateShowcaseUrl = (url) => {
    if (!url) return '';
    try {
      new URL(url);
      return '';
    } catch {
      return 'Please enter a valid URL (including https://)';
    }
  };

  // Email validation handlers
  const handleEmailChange = (e) => {
    setForm({ ...form, email: e.target.value });
    setEmailError(validateEmail(e.target.value));
  };
  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(validateEmail(form.email));
  };

  // Showcase validation handlers
  const handleShowcaseChange = (platform, idx, value) => {
    setForm((prev) => ({
      ...prev,
      showcase: { ...prev.showcase, [`${platform}${idx > 0 ? idx + 1 : ''}`]: value },
    }));
    setShowcaseErrors((prev) => ({
      ...prev,
      [`${platform}${idx > 0 ? idx + 1 : ''}`]: validateShowcaseUrl(value),
    }));
  };
  const handleShowcaseBlur = (platform, idx, value) => {
    setShowcaseErrors((prev) => ({
      ...prev,
      [`${platform}${idx > 0 ? idx + 1 : ''}`]: validateShowcaseUrl(value),
    }));
  };

const handleRemoveShowcase = (platform, idx) => {
  setForm((prev) => {
      const updated = { ...prev };
      delete updated.showcase[`${platform}${idx > 0 ? idx + 1 : ''}`];
      return updated;
    });
  };

const handleAddShowcase = (platform) => {
  setForm((prev) => {
      const updated = { ...prev };
    let count = 1;
      while (updated.showcase[`${platform}${count > 1 ? count : ''}`]) {
      count++;
    }
      updated.showcase[`${platform}${count > 1 ? count : ''}`] = '';
      return updated;
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
const passwordStrength = passwordRequirements.reduce((acc, req) => acc + (req.test(form.password) ? 1 : 0), 0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setSubmitting(true);
if (usernameTaken) {
setMessage('Username is already taken.');
      setSubmitting(false);
return;
}
    // Sanitize and validate form data before sending
    let artTypeToSend = form.artType;
    if (form.artType === 'other') {
      artTypeToSend = toSentenceCase(customArtType.trim());
    }
    const sanitizedForm = sanitizeObject({ ...form, artType: artTypeToSend });
    if (!isValidProfileInput(sanitizedForm)) {
      setMessage('Invalid input. Please check your entries.');
      setSubmitting(false);
return;
}
    try {
      const res = await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitizedForm),
      });
      if (res.ok) {
        setMessage('Profile submitted successfully! Redirecting to login...');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        const data = await res.json();
setMessage(data.error || 'Server error.');
      }
    } catch (err) {
setMessage('Server error.');
    }
    setSubmitting(false);
  };

  // Step validation
  const isAccountStepValid = form.username && form.email && form.password && form.confirmPassword && form.password === form.confirmPassword && passwordStrength >= 3 && !usernameTaken;
  const isProfileStepValid = form.name && form.artType && form.bio && form.photoUrl;
  const isShowcaseStepValid = Object.keys(form.showcase).some(key => !key.endsWith('Checked') && form.showcase[key]);

  // Stepper UI
  const Stepper = () => (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-8">
      {STEPS.map((label, idx) => (
        <div key={label} className="flex items-center gap-2 mb-2 sm:mb-0">
          <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${step >= idx ? 'border-cyan-400 bg-cyan-600 text-white' : 'border-gray-500 bg-gray-800 text-gray-400'} font-bold`}>{step > idx ? <FaCheckCircle className="text-green-400" /> : idx + 1}</div>
          <span className={`text-xs sm:text-sm font-semibold ${step === idx ? 'text-cyan-200' : 'text-gray-400'}`}>{label}</span>
          {idx < STEPS.length - 1 && <div className="hidden sm:block w-8 h-1 bg-cyan-800 rounded-full" />}
              </div>
      ))}
          </div>
  );

  // Step content
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4 mt-2 border-b border-cyan-800 pb-2">Account Details</h3>
            {/* Username, Email, Password, Confirm Password fields with validation and password strength meter */}
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
            onFocus={() => setShowUsernameHelp(true)}
            onBlur={() => setShowUsernameHelp(false)}
            className={`block w-full p-3 rounded-lg border ${usernameError || usernameTaken ? 'border-red-500' : 'border-white/20'} bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-cyan-400`}
            required
            autoComplete="off"
            aria-describedby="username-instructions username-error"
          />
          {showUsernameHelp && (
            <div id="username-instructions" className="text-cyan-400 text-xs mt-1">
              Usernames must be 3–30 characters. Only lowercase letters, numbers, and underscores (_) are allowed. No spaces or dashes.
            </div>
          )}
          {usernameError && (
            <p id="username-error" className="text-red-400 text-sm mt-1">{usernameError}</p>
          )}
          {usernameTaken && !usernameError && (
            <p className="text-red-400 text-sm mt-1">This username is already taken.</p>
          )}
        </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                onFocus={() => setShowEmailHelp(true)}
                className={`block w-full p-3 rounded-lg border ${emailError && emailTouched ? 'border-red-500' : 'border-white/20'} bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-cyan-400`}
                required
                autoComplete="off"
                aria-describedby="email-instructions email-error"
              />
            {showEmailHelp && (
              <div id="email-instructions" className="text-cyan-400 text-xs mt-1">
                Enter a valid email address you have access to.
              </div>
            )}
            {emailError && emailTouched && (
              <p id="email-error" className="text-red-400 text-sm mt-1">{emailError}</p>
            )}
            </div>
            <div className="mb-4">
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
              onFocus={() => { setShowPasswordChecklist(true); setShowPasswordHelp(true); }}
              onBlur={() => { setShowPasswordChecklist(false); setShowPasswordHelp(false); }}
              className="block w-full p-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-cyan-400"
              required
                  autoComplete="new-password"
                  placeholder="Create a password"
                  aria-describedby="password-instructions"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-300"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
              {/* Password Strength Meter */}
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-2 rounded bg-gray-700 overflow-hidden">
                  <div
                    className={`h-2 rounded transition-all duration-300 ${
                      passwordStrength === 4 ? 'bg-green-500 w-full' :
                      passwordStrength === 3 ? 'bg-yellow-400 w-3/4' :
                      passwordStrength === 2 ? 'bg-orange-400 w-1/2' :
                      passwordStrength === 1 ? 'bg-red-400 w-1/4' :
                      'bg-gray-500 w-0'
                    }`}
                  />
                </div>
                <span className="text-xs text-cyan-200 ml-2">
                  {passwordStrength === 4 ? 'Strong' : passwordStrength === 3 ? 'Good' : passwordStrength === 2 ? 'Weak' : 'Very Weak'}
                </span>
          </div>
          {showPasswordChecklist && (
            <div className="mt-2 bg-white/10 backdrop-blur-sm p-3 rounded-lg shadow text-sm border border-white/20">
              <p className="mb-1 font-semibold text-white">Password must have:</p>
              <ul>
                {passwordRequirements.map((req, idx) => (
                  <li key={idx} className="flex items-center text-white">
                    <span
                      className={`inline-block w-3 h-3 rounded-full mr-2 border-2 ${req.test(form.password) ? 'bg-cyan-500 border-cyan-500' : 'bg-gray-700 border-gray-500'}`}
                    ></span>
                    {req.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {showPasswordHelp && (
            <div id="password-instructions" className="text-cyan-400 text-xs mt-1">
              Password must be at least 8 characters, include uppercase, lowercase, and a number.
        </div>
          )}
        </div>
            <div className="mb-8">
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
              onFocus={() => setShowConfirmPasswordHelp(true)}
              onBlur={() => setShowConfirmPasswordHelp(false)}
              className={`block w-full p-3 rounded-lg border pr-10 bg-white/10 backdrop-blur-sm text-white ${form.confirmPassword ? form.password === form.confirmPassword ? 'border-green-500 focus:ring-green-400' : 'border-red-500 focus:ring-red-400' : 'border-white/20 focus:ring-cyan-400'}`}
              required
              aria-describedby="confirm-password-instructions"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-300"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              tabIndex={-1}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {showConfirmPasswordHelp && (
            <div id="confirm-password-instructions" className="text-cyan-400 text-xs mt-1">
              Re-enter your password to confirm.
        </div>
          )}
        </div>
          </>
        );
      case 1:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4 mt-2 border-b border-cyan-800 pb-2">Profile Details</h3>
            {/* Profile photo, banner, name, art type, bio, optional fields */}
            <div className="mb-4 flex flex-col items-center">
              <div className="relative w-24 h-24">
                {photoPreview || form.photoUrl ? (
                  <img
                    src={photoPreview || form.photoUrl}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-cyan-400 bg-gray-800"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full flex items-center justify-center border-2 border-cyan-400 bg-gray-800">
                    <FaCamera className="text-3xl text-cyan-300" aria-label="Add profile photo" />
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
              <span className="text-sm text-cyan-200 mt-2 flex items-center gap-1">
  Change Profile Photo
  <span className="ml-1 cursor-pointer group relative align-middle">
    <FaInfoCircle className="inline text-cyan-400" aria-label="Profile photo requirements" tabIndex={0} />
    <span className="absolute left-6 top-1/2 -translate-y-1/2 w-56 bg-slate-800 text-cyan-100 text-xs rounded shadow-lg px-3 py-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition pointer-events-none z-10">
      JPG or PNG, 1:1 aspect ratio, max 2MB.
    </span>
  </span>
</span>
            </div>
            <div className="mb-8">
              <div className="relative w-full h-32">
                {bannerPreview || form.bannerUrl ? (
                  <img
                    src={bannerPreview || form.bannerUrl}
                    alt="Banner"
                    className="w-full h-32 object-cover rounded-lg border-2 border-cyan-400 bg-gray-800"
                  />
                ) : (
                  <div className="w-full h-32 flex items-center justify-center rounded-lg border-2 border-cyan-400 bg-gray-800">
                    <FaCamera className="text-3xl text-cyan-300" aria-label="Add banner image" />
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
              <span className="text-sm text-cyan-200 mt-2 flex items-center gap-1">
  Change Banner Image <span className="ml-2 text-xs text-cyan-300">(optional)</span>
  <span className="ml-1 cursor-pointer group relative align-middle">
    <FaInfoCircle className="inline text-cyan-400" aria-label="Banner image requirements" tabIndex={0} />
    <span className="absolute left-6 top-1/2 -translate-y-1/2 w-56 bg-slate-800 text-cyan-100 text-xs rounded shadow-lg px-3 py-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition pointer-events-none z-10">
      JPG or PNG, 4:1 aspect ratio, max 2MB.
    </span>
  </span>
</span>
            </div>
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
            onFocus={() => setShowNameHelp(true)}
            onBlur={() => setShowNameHelp(false)}
            className="block w-full p-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-cyan-400"
            required
            autoComplete="off"
            aria-describedby="name-instructions"
          />
          {showNameHelp && (
            <div id="name-instructions" className="text-cyan-400 text-xs mt-1">
              Enter your full name.
        </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="artType">
            Art Type
          </label>
          <select
            name="artType"
            id="artType"
            value={form.artType}
            onChange={handleChange}
            onFocus={() => setShowArtTypeHelp(true)}
            onBlur={() => setShowArtTypeHelp(false)}
            className="block w-full p-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-cyan-400"
            required
          >
            <option value="">Select art type</option>
            {ART_TYPES.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          {showArtTypeHelp && (
            <div className="text-cyan-400 text-xs mt-1">
              Select the type of creative work you specialize in.
        </div>
          )}
        </div>
        {form.artType === 'other' && (
  <div className="mb-4">
    <label className="block mb-1 font-semibold" htmlFor="customArtType">
      Your Art Type
    </label>
    <input
      type="text"
      name="customArtType"
      id="customArtType"
      value={customArtType}
      onChange={e => {
        setCustomArtType(e.target.value);
        setCustomArtTypeError(validateCustomArtType(e.target.value));
      }}
      onBlur={e => setCustomArtTypeError(validateCustomArtType(e.target.value))}
      placeholder="e.g. Spoken Word Artist"
      className={`block w-full p-3 rounded-lg border ${customArtTypeError ? 'border-red-500' : 'border-white/20'} bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-cyan-400`}
      required
      aria-describedby="custom-art-type-helper custom-art-type-error"
    />
    <div id="custom-art-type-helper" className="text-cyan-400 text-xs mt-1">
      Please enter your art type. This will be shown on your public profile.
    </div>
    {customArtTypeError && (
      <div id="custom-art-type-error" className="text-red-400 text-xs mt-1">{customArtTypeError}</div>
    )}
  </div>
)}
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="bio">
            Bio
          </label>
          <textarea
            name="bio"
            id="bio"
            value={form.bio}
            onChange={handleChange}
            onFocus={() => setShowBioHelp(true)}
            onBlur={() => setShowBioHelp(false)}
            className="block w-full p-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-cyan-400"
            rows={3}
            placeholder="Tell us about yourself"
            required
          />
          {showBioHelp && (
            <div className="text-cyan-400 text-xs mt-1">
              Write a brief description of your creative journey and expertise.
        </div>
          )}
        </div>
        {/* Conditionally Rendered Optional Fields */}
        {getOptionalFields(form.artType).includes('stageName') && (
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="stageName">
              Stage Name
              <span className="ml-1 cursor-pointer group relative align-middle">
                <FaInfoCircle className="inline text-cyan-400" aria-label="More info about stage name" tabIndex={0} />
                <span className="absolute left-6 top-1/2 -translate-y-1/2 w-48 bg-slate-800 text-cyan-100 text-xs rounded shadow-lg px-3 py-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition pointer-events-none z-10">
                  This is the name you perform under. Optional.
                </span>
              </span>
            </label>
            <input
              type="text"
              name="stageName"
              id="stageName"
              value={form.stageName}
              onChange={handleChange}
              className="block w-full p-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-cyan-400"
              placeholder="e.g. Wizkid"
            />
          </div>
        )}
        {getOptionalFields(form.artType).includes('genre') && (
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="genre">
              Genre <span className="text-xs text-cyan-300">(optional)</span>
            </label>
            <input
              type="text"
              name="genre"
              id="genre"
              value={form.genre}
              onChange={handleChange}
              className="block w-full p-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-cyan-400"
              placeholder={GENRE_EXAMPLES}
              autoComplete="off"
            />
            {genreSuggestions.length > 0 && (
              <ul className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg mt-1 text-white">
                {genreSuggestions.map((g, idx) => (
                  <li
                    key={idx}
                    className="px-3 py-1 cursor-pointer hover:bg-cyan-700"
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
              Producer Tag <span className="text-xs text-cyan-300">(optional)</span>
            </label>
            <input
              type="text"
              name="producerTag"
              id="producerTag"
              value={form.producerTag}
              onChange={handleChange}
              className="block w-full p-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-cyan-400"
              placeholder="e.g. It's XYZ on the beat"
            />
          </div>
        )}
        {getOptionalFields(form.artType).includes('engineerTag') && (
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="engineerTag">
              Engineer Tag <span className="text-xs text-cyan-300">(optional)</span>
            </label>
            <input
              type="text"
              name="engineerTag"
              id="engineerTag"
              value={form.engineerTag}
              onChange={handleChange}
              className="block w-full p-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-cyan-400"
              placeholder="e.g. Mixed by XYZ"
            />
          </div>
        )}
        {getOptionalFields(form.artType).includes('directedBy') && (
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="directedBy">
              Directed By <span className="text-xs text-cyan-300">(optional)</span>
            </label>
            <input
              type="text"
              name="directedBy"
              id="directedBy"
              value={form.directedBy}
              onChange={handleChange}
              className="block w-full p-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-cyan-400"
              placeholder="e.g. Directed by XYZ"
            />
          </div>
        )}
        {getOptionalFields(form.artType).includes('designerStyle') && (
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="designerStyle">
              Style <span className="text-xs text-cyan-300">(optional)</span>
            </label>
            <input
              type="text"
              name="designerStyle"
              id="designerStyle"
              value={form.designerStyle}
              onChange={handleChange}
              className="block w-full p-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-cyan-400"
              placeholder={DESIGN_STYLE_EXAMPLES}
              autoComplete="off"
            />
            {designerStyleSuggestions.length > 0 && (
              <ul className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg mt-1 text-white">
                {designerStyleSuggestions.map((s, idx) => (
                  <li
                    key={idx}
                    className="px-3 py-1 cursor-pointer hover:bg-cyan-700"
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
              Skitmaker Name <span className="text-xs text-cyan-300">(optional)</span>
            </label>
            <input
              type="text"
              name="skitmakerName"
              id="skitmakerName"
              value={form.skitmakerName}
              onChange={handleChange}
              className="block w-full p-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-cyan-400"
              placeholder="e.g. Mr. Macaroni"
            />
          </div>
        )}
        {getOptionalFields(form.artType).includes('vixenName') && (
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="vixenName">
              Vixen Name <span className="text-xs text-cyan-300">(optional)</span>
            </label>
            <input
              type="text"
              name="vixenName"
              id="vixenName"
              value={form.vixenName}
              onChange={handleChange}
              className="block w-full p-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-cyan-400"
              placeholder="e.g. Vixen Queen"
            />
          </div>
        )}
        {getOptionalFields(form.artType).includes('shotBy') && (
<div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="shotBy">
              Shot By <span className="text-xs text-cyan-300">(optional)</span>
</label>
            <input
              type="text"
              name="shotBy"
              id="shotBy"
              value={form.shotBy}
              onChange={handleChange}
              className="block w-full p-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-cyan-400"
              placeholder="e.g. Shot by XYZ"
            />
          </div>
        )}
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4 mt-2 border-b border-cyan-800 pb-2">Showcase Your Work</h3>
<p className="text-cyan-200 text-sm mb-2">
Add links to your works on any of these platforms. If your platform is not listed, use the "Other Platform" option below.
</p>
{/* Platform checkboxes */}
<div className="flex flex-wrap gap-4 mb-4">
  {form.artType === 'other'
    ? ['custom1', 'custom2', 'custom3'].map((platform, i, arr) => (
        <label key={platform} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer shadow bg-white/10 backdrop-blur-sm text-white border border-white/20">
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
  className="accent-cyan-500 w-5 h-5"
/>
<FaLink className="inline text-blue-500 mr-1" />
<span className="font-semibold">Custom Link {i + 1}</span>
                  </label>
    ))
    : [...getShowcasePlatforms(form.artType), 'otherPlatform'].map((platform) => (
<label key={platform} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer shadow bg-white/10 backdrop-blur-sm text-white border border-white/20">
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
  className="accent-cyan-500 w-5 h-5"
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
{form.artType === 'other' ? (
  ['custom1', 'custom2', 'custom3'].map((platform, i, arr) =>
    form.showcase[`${platform}Checked`] ? (
      <div key={platform} className="mb-2">
        <div className="flex items-center gap-2 mb-1">
          <FaLink className="inline text-blue-500 mr-1" />
          <span className="font-semibold">Custom Link {i + 1}</span>
        </div>
        {[0, 1, 2].map((idx) =>
          form.showcase[`${platform}${idx > 0 ? idx + 1 : ''}`] !== undefined ||
          (idx === 0 && form.showcase[platform] !== undefined)
            ? (
              <div key={platform + idx} className="flex items-center gap-2 mb-2">
                <input
                  type="url"
                  placeholder={`Paste a link to your work on Custom Link ${i + 1}`}
                  value={form.showcase[`${platform}${idx > 0 ? idx + 1 : ''}`] !== undefined
                    ? form.showcase[`${platform}${idx > 0 ? idx + 1 : ''}`]
                    : form.showcase[platform] || ''}
                  onChange={(e) => handleShowcaseChange(platform, idx, e.target.value)}
                  onBlur={(e) => handleShowcaseBlur(platform, idx, e.target.value)}
                  className={`block w-full p-3 rounded-lg border ${showcaseErrors[`${platform}${idx > 0 ? idx + 1 : ''}`] ? 'border-red-500' : 'border-white/20'} bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-cyan-400`}
                  required
                />
                {showcaseErrors[`${platform}${idx > 0 ? idx + 1 : ''}`] && (
                  <span className="text-red-400 text-xs ml-2">{showcaseErrors[`${platform}${idx > 0 ? idx + 1 : ''}`]}</span>
                )}
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
      </div>
    ) : null
  )
) : (
  [...getShowcasePlatforms(form.artType), 'otherPlatform'].map((platform, i, arr) =>
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
                  onChange={(e) => handleShowcaseChange(platform, idx, e.target.value)}
                  onBlur={(e) => handleShowcaseBlur(platform, idx, e.target.value)}
                  className={`block w-full p-3 rounded-lg border ${showcaseErrors[`${platform}${idx > 0 ? idx + 1 : ''}`] ? 'border-red-500' : 'border-white/20'} bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-cyan-400`}
  required
/>
                {showcaseErrors[`${platform}${idx > 0 ? idx + 1 : ''}`] && (
                  <span className="text-red-400 text-xs ml-2">{showcaseErrors[`${platform}${idx > 0 ? idx + 1 : ''}`]}</span>
                )}
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
          className="text-cyan-400 hover:text-cyan-600 text-sm font-semibold"
        >
          + Add another link
        </button>
      )}
    </div>
  ) : null
  )
)}
          </>
        );
      case 3:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4 mt-2 border-b border-cyan-800 pb-2">Confirmation</h3>
            <div className="bg-white/10 p-4 rounded-lg mb-4 text-cyan-100">
              <p className="mb-2">Please review your information before submitting:</p>
              <ul className="text-sm space-y-1">
                <li><b>Username:</b> {form.username}</li>
                <li><b>Email:</b> {form.email}</li>
                <li><b>Name:</b> {form.name}</li>
                <li><b>Art Type:</b> {toSentenceCase(form.artType)}</li>
                <li><b>Bio:</b> {form.bio}</li>
                {/* Add more summary fields as needed */}
              </ul>
                </div>
          </>
        );
      default:
        return null;
    }
  };

  // Navigation buttons
  const renderNav = () => (
    <div className="flex justify-between mt-8 gap-4">
      {step > 0 && (
        <button type="button" className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-800 text-white font-semibold" onClick={() => setStep(step - 1)}>
          <FaChevronLeft className="inline mr-2" /> Back
        </button>
      )}
      {step < STEPS.length - 1 && (
        <button
          type="button"
          className="ml-auto px-6 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold"
          onClick={() => setStep(step + 1)}
          disabled={
            (step === 0 && !isAccountStepValid) ||
            (step === 1 && !isProfileStepValid) ||
            (step === 2 && !isShowcaseStepValid) ||
            emailError && emailTouched ||
            Object.values(showcaseErrors).some(error => error) ||
            (step === 1 && form.artType === 'other' && customArtTypeError)
          }
        >
          Next <FaChevronRight className="inline ml-2" />
        </button>
      )}
      {step === STEPS.length - 1 && (
          <button
            type="submit"
          className="ml-auto px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold flex items-center gap-2"
          disabled={submitting}
          >
          {submitting && <span className="loader border-2 border-white border-t-cyan-400 rounded-full w-5 h-5 animate-spin"></span>}
            Create Profile
          </button>
      )}
    </div>
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 flex items-center justify-center bg-fixed px-2 sm:px-0 py-12">
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="w-full max-w-3xl mx-auto p-4 sm:p-8 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg text-white border border-white/20"
        >
          <h2 className="text-3xl font-bold mb-2 text-center">Create Your Profile</h2>
          <p className="text-cyan-200 text-center mb-8">Join Kloud 9 and showcase your creative talent to the world. Fill out the form below to get started.</p>
          <Stepper />
          {renderStep()}
          {renderNav()}
        {message && (
          <div className="mt-4 text-center font-semibold text-cyan-300">
            {message}
          </div>
        )}
          <div className="mt-8 text-center text-cyan-200 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-cyan-300 font-semibold hover:underline focus:outline-none focus:underline">Sign in</Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}