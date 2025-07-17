import { useState } from 'react';
import { FaCamera } from 'react-icons/fa';

export default function ImagesSection({ initialPhotoUrl, initialBannerUrl, onSave }) {
  const [photoUrl, setPhotoUrl] = useState(initialPhotoUrl || '');
  const [bannerUrl, setBannerUrl] = useState(initialBannerUrl || '');
  const [photoPreview, setPhotoPreview] = useState('');
  const [bannerPreview, setBannerPreview] = useState('');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [originalPhotoUrl, setOriginalPhotoUrl] = useState(initialPhotoUrl || '');
  const [originalBannerUrl, setOriginalBannerUrl] = useState(initialBannerUrl || '');

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'photo') {
        setPhotoPreview(reader.result);
      } else {
        setBannerPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    try {
      await onSave({
        photoUrl: photoPreview || photoUrl,
        bannerUrl: bannerPreview || bannerUrl,
      });
      setMessage('Images updated!');
      if (photoPreview) setPhotoUrl(photoPreview);
      if (bannerPreview) setBannerUrl(bannerPreview);
      setOriginalPhotoUrl(photoPreview || photoUrl);
      setOriginalBannerUrl(bannerPreview || bannerUrl);
      setPhotoPreview('');
      setBannerPreview('');
      setEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to update images.');
    }
    setSaving(false);
  };

  const handleCancel = () => {
    setPhotoUrl(originalPhotoUrl);
    setBannerUrl(originalBannerUrl);
    setPhotoPreview('');
    setBannerPreview('');
    setError('');
    setMessage('');
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="mb-8 p-6 rounded-lg bg-slate-800 shadow">
        <h3 className="text-lg font-bold mb-4 text-cyan-200">Profile Photo & Banner</h3>
        <div className="mb-6 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-2">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-cyan-400 bg-slate-800"
                />
              ) : (
                <div className="w-32 h-32 rounded-full flex items-center justify-center border-4 border-cyan-400 bg-slate-800">
                  <FaCamera className="text-3xl text-cyan-300" aria-label="Add profile photo" />
                </div>
              )}
            </div>
            <span className="text-sm text-cyan-200">Profile Photo</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="relative w-full h-32 mb-2">
              {bannerUrl ? (
                <img
                  src={bannerUrl}
                  alt="Banner"
                  className="w-full h-32 object-cover rounded-lg border-2 border-cyan-400 bg-slate-800"
                />
              ) : (
                <div className="w-full h-32 flex items-center justify-center rounded-lg border-2 border-cyan-400 bg-slate-800">
                  <FaCamera className="text-3xl text-cyan-300" aria-label="Add banner image" />
                </div>
              )}
            </div>
            <span className="text-sm text-cyan-200">Banner Image <span className="text-xs text-cyan-300">(optional)</span></span>
          </div>
        </div>
        <button
          type="button"
          className="py-2 px-6 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-md transition"
          onClick={() => setEditing(true)}
        >
          Edit
        </button>
        {message && <div className="mt-2 text-green-400 text-sm">{message}</div>}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-lg bg-slate-800 shadow">
      <h3 className="text-lg font-bold mb-4 text-cyan-200">Profile Photo & Banner</h3>
      <div className="mb-6 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-2">
            {photoPreview || photoUrl ? (
              <img
                src={photoPreview || photoUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-cyan-400 bg-slate-800"
              />
            ) : (
              <div className="w-32 h-32 rounded-full flex items-center justify-center border-4 border-cyan-400 bg-slate-800">
                <FaCamera className="text-3xl text-cyan-300" aria-label="Add profile photo" />
              </div>
            )}
            <label className="absolute bottom-2 right-2 bg-black/60 rounded-full p-2 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={e => handleImageUpload(e, 'photo')}
                className="hidden"
              />
              <FaCamera className="text-white" />
            </label>
          </div>
          <span className="text-sm text-cyan-200">Change Profile Photo</span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <div className="relative w-full h-32 mb-2">
            {bannerPreview || bannerUrl ? (
              <img
                src={bannerPreview || bannerUrl}
                alt="Banner"
                className="w-full h-32 object-cover rounded-lg border-2 border-cyan-400 bg-slate-800"
              />
            ) : (
              <div className="w-full h-32 flex items-center justify-center rounded-lg border-2 border-cyan-400 bg-slate-800">
                <FaCamera className="text-3xl text-cyan-300" aria-label="Add banner image" />
              </div>
            )}
            <label className="absolute bottom-2 right-2 bg-black/60 rounded-full p-2 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={e => handleImageUpload(e, 'banner')}
                className="hidden"
              />
              <FaCamera className="text-white" />
            </label>
          </div>
          <span className="text-sm text-cyan-200">Change Banner Image <span className="text-xs text-cyan-300">(optional)</span></span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="py-2 px-6 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-md transition"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
        <button
          type="button"
          className="py-2 px-6 rounded-lg bg-slate-600 hover:bg-slate-700 text-white font-bold text-md transition"
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