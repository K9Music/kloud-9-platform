import { useState } from 'react';

const MAX_LENGTH = 1500;

export default function BioSection({ initialBio = '', onSave }) {
  const [bio, setBio] = useState(initialBio);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [originalBio, setOriginalBio] = useState(initialBio);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    if (!bio.trim()) {
      setError('Bio cannot be empty.');
      setSaving(false);
      return;
    }
    if (bio.length > MAX_LENGTH) {
      setError(`Bio cannot exceed ${MAX_LENGTH} characters.`);
      setSaving(false);
      return;
    }
    try {
      await onSave({ bio });
      setMessage('Bio updated!');
      setOriginalBio(bio);
      setEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to update bio.');
    }
    setSaving(false);
  };

  const handleCancel = () => {
    setBio(originalBio);
    setError('');
    setMessage('');
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="mb-8 p-6 rounded-lg bg-slate-800 shadow">
        <h3 className="text-lg font-bold mb-4 text-cyan-200">Bio / About</h3>
        <div className="mb-4 text-cyan-100 whitespace-pre-line">{bio || <span className="italic text-cyan-300">No bio set.</span>}</div>
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
      <h3 className="text-lg font-bold mb-4 text-cyan-200">Bio / About</h3>
      <div className="mb-4">
        <textarea
          value={bio}
          onChange={e => setBio(e.target.value)}
          className="block w-full p-3 rounded-lg border border-cyan-700 bg-slate-900 text-cyan-100 focus:ring-2 focus:ring-cyan-400"
          rows={5}
          maxLength={MAX_LENGTH}
          placeholder="Tell us about yourself, your art, or your creative journey."
        />
        <div className="text-xs text-cyan-300 mt-1 text-right">
          {bio.length} / {MAX_LENGTH} characters
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