import { useState } from 'react';
import { FaSpotify, FaYoutube, FaSoundcloud, FaApple, FaMusic, FaLink, FaInstagram, FaTiktok, FaDribbble, FaBehance, FaVimeo, FaImdb } from 'react-icons/fa';

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
const getShowcasePlatforms = (artType) => {
  const type = ART_TYPES.find((t) => t.value === artType);
  return type ? type.showcases : [];
};

export default function ShowcaseSection({ initialShowcase = {}, artType, onSave }) {
  const [showcase, setShowcase] = useState(initialShowcase);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [originalShowcase, setOriginalShowcase] = useState(initialShowcase);

  const handleShowcaseChange = (platform, idx, value) => {
    setShowcase((prev) => ({
      ...prev,
      [`${platform}${idx > 0 ? idx + 1 : ''}`]: value,
    }));
  };
  const handleRemoveShowcase = (platform, idx) => {
    setShowcase((prev) => {
      const updated = { ...prev };
      delete updated[`${platform}${idx > 0 ? idx + 1 : ''}`];
      return updated;
    });
  };
  const handleAddShowcase = (platform) => {
    setShowcase((prev) => {
      const updated = { ...prev };
      let count = 1;
      while (updated[`${platform}${count > 1 ? count : ''}`]) {
        count++;
      }
      updated[`${platform}${count > 1 ? count : ''}`] = '';
      return updated;
    });
  };

  const handleCheckboxChange = (platform) => {
    setShowcase((prev) => {
      const checked = !prev[`${platform}Checked`];
      const updated = { ...prev, [`${platform}Checked`]: checked };
      if (checked && updated[platform] === undefined) {
        updated[platform] = '';
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    try {
      await onSave(showcase);
      setMessage('Showcase updated!');
      setOriginalShowcase(showcase);
      setEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to update showcase.');
    }
    setSaving(false);
  };

  const handleCancel = () => {
    setShowcase(originalShowcase);
    setError('');
    setMessage('');
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="mb-8 p-6 rounded-lg bg-gray-800 shadow">
        <h3 className="text-lg font-bold mb-4">Showcase / Portfolio</h3>
        <div className="mb-4">
          {Object.keys(showcase).length === 0 && <span className="italic text-orange-300">No showcase links set.</span>}
          {getShowcasePlatforms(artType).map((platform) => (
            showcase[`${platform}Checked`] ? (
              <div key={platform} className="mb-2">
                <div className="flex items-center gap-2 mb-1">
                  {PLATFORM_ICONS[platform] || <FaLink className="inline text-blue-500 mr-1" />}
                  <span className="font-semibold">
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </span>
                </div>
                {[0, 1, 2].map((idx) =>
                  showcase[`${platform}${idx > 0 ? idx + 1 : ''}`] !== undefined ||
                  (idx === 0 && showcase[platform] !== undefined)
                    ? (
                      <div key={platform + idx} className="flex items-center gap-2 mb-2">
                        <a
                          href={showcase[`${platform}${idx > 0 ? idx + 1 : ''}`] || showcase[platform] || ''}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-200 underline"
                        >
                          {showcase[`${platform}${idx > 0 ? idx + 1 : ''}`] || showcase[platform] || ''}
                        </a>
                      </div>
                    ) : null
                )}
              </div>
            ) : null
          ))}
        </div>
        <button
          type="button"
          className="py-2 px-6 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-md transition"
          onClick={() => setEditing(true)}
        >
          Edit
        </button>
        {message && <div className="mt-2 text-green-400 text-sm">{message}</div>}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-lg bg-gray-800 shadow">
      <h3 className="text-lg font-bold mb-4">Showcase / Portfolio</h3>
      <p className="text-orange-200 text-sm mb-2">
        Add links to your works on any of these platforms. If your platform is not listed, use the "Other Platform" option below.
      </p>
      <div className="flex flex-wrap gap-4 mb-4">
        {[
          ...getShowcasePlatforms(artType),
          'otherPlatform',
        ].map((platform) => (
          <label key={platform} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer shadow bg-gray-800 text-gray-200">
            <input
              type="checkbox"
              checked={!!showcase[`${platform}Checked`]}
              onChange={() => handleCheckboxChange(platform)}
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
      {[
        ...getShowcasePlatforms(artType),
        'otherPlatform',
      ].map((platform) =>
        showcase[`${platform}Checked`] ? (
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
              showcase[`${platform}${idx > 0 ? idx + 1 : ''}`] !== undefined ||
              (idx === 0 && showcase[platform] !== undefined)
                ? (
                  <div key={platform + idx} className="flex items-center gap-2 mb-2">
                    <input
                      type="url"
                      placeholder={
                        platform === 'otherPlatform'
                          ? 'Paste a link to your work on another platform'
                          : `Paste a link to your work on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`
                      }
                      value={showcase[`${platform}${idx > 0 ? idx + 1 : ''}`] !== undefined
                        ? showcase[`${platform}${idx > 0 ? idx + 1 : ''}`]
                        : showcase[platform] || ''}
                      onChange={e => handleShowcaseChange(platform, idx, e.target.value)}
                      className="block w-full p-3 rounded-lg border border-gray-300 bg-gray-900 text-orange-100 focus:ring-2 focus:ring-orange-400"
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
            {Object.keys(showcase).filter((key) =>
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
          </div>
        ) : null
      )}
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="py-2 px-6 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-md transition"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
        <button
          type="button"
          className="py-2 px-6 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-bold text-md transition"
          onClick={handleCancel}
          disabled={saving}
        >
          Cancel
        </button>
      </div>
      {message && <div className="mt-2 text-green-400 text-sm">{message}</div>}
      {error && <div className="mt-2 text-red-400 text-sm">{error}</div>}
    </form>
  );
} 