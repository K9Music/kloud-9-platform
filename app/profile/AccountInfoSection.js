"use client";
import { useState, useMemo, useEffect } from 'react';

export default function AccountInfoSection({ initialUsername, initialName, artType, lastUsernameChange, usernameChangeCooldown, onSave }) {
  const [username, setUsername] = useState(initialUsername || '');
  const [name, setName] = useState(initialName || '');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [originalUsername, setOriginalUsername] = useState(initialUsername || '');
  const [originalName, setOriginalName] = useState(initialName || '');
  const [usernameError, setUsernameError] = useState('');
  const [showUsernameHelp, setShowUsernameHelp] = useState(false);
  const [showNameHelp, setShowNameHelp] = useState(false);

  // Username change restriction logic
  const now = Date.now();
  const lastChange = lastUsernameChange ? new Date(lastUsernameChange).getTime() : 0;
  const cooldown = typeof usernameChangeCooldown === 'number' ? usernameChangeCooldown : 90 * 24 * 60 * 60 * 1000; // default 90 days
  const canChangeUsername = now - lastChange >= cooldown;
  const nextChangeDate = useMemo(() => {
    if (canChangeUsername) return null;
    const msLeft = lastChange + cooldown - now;
    const days = Math.ceil(msLeft / (1000 * 60 * 60 * 24));
    const date = new Date(lastChange + cooldown);
    return { days, date };
  }, [canChangeUsername, lastChange, cooldown, now]);

  const USERNAME_MIN_LENGTH = 3;
  const USERNAME_MAX_LENGTH = 30;
  const USERNAME_REGEX = /^[a-z0-9_]+$/; // Only lowercase letters, numbers, underscores

  const getUsernameValidationError = (username) => {
    if (!username) return 'Username is required.';
    if (username.length < USERNAME_MIN_LENGTH) return `Username must be at least ${USERNAME_MIN_LENGTH} characters.`;
    if (username.length > USERNAME_MAX_LENGTH) return `Username cannot exceed ${USERNAME_MAX_LENGTH} characters.`;
    if (!USERNAME_REGEX.test(username)) return 'Usernames can only contain lowercase letters, numbers, and underscores (_). No spaces or dashes.';
    return '';
  };

  useEffect(() => {
    setUsernameError(getUsernameValidationError(username));
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    // Basic validation
    if (!username.trim() || !name.trim()) {
      setError('Username and Name are required.');
      setSaving(false);
      return;
    }
    if (!canChangeUsername && username !== initialUsername) {
      setError('You cannot change your username yet.');
      setSaving(false);
      return;
    }
    try {
      await onSave({ username: username.toLowerCase(), name });
      setMessage('Account info updated!');
      setOriginalUsername(username.toLowerCase());
      setOriginalName(name);
      setEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to update account info.');
    }
    setSaving(false);
  };

  const handleCancel = () => {
    setUsername(originalUsername);
    setName(originalName);
    setError('');
    setMessage('');
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="mb-8 p-6 rounded-lg bg-slate-800 shadow">
        <h3 className="text-lg font-bold mb-4 text-cyan-200">Account Info</h3>
        <div className="mb-4">
          <label className="block text-sm font-bold text-cyan-300 mb-1 uppercase tracking-wider">Username</label>
          <div className="text-base font-normal text-cyan-100 bg-slate-900 rounded px-3 py-2">{username}</div>
          <div className="text-xs text-cyan-300 mb-2 italic mt-3">
            You can change your username once every 90 days. Changing your username will also update your public profile link (e.g., <span className="font-mono">k9music.com/profile/&lt;new-username&gt;</span>).
          </div>
          {!canChangeUsername && nextChangeDate && (
            <div className="text-xs text-cyan-300 mt-1 italic">
              You can change your username again in {nextChangeDate.days} day{nextChangeDate.days !== 1 ? 's' : ''} (on {nextChangeDate.date.toLocaleDateString()}).
            </div>
          )}
        </div>
        <hr className="my-4 border-cyan-800" />
        <div className="mb-4">
          <label className="block text-sm font-bold text-cyan-300 mb-1 uppercase tracking-wider">Name</label>
          <div className="text-base font-normal text-cyan-100 bg-slate-900 rounded px-3 py-2">{name}</div>
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
      <h3 className="text-lg font-bold mb-4 text-cyan-200">Account Info</h3>
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-cyan-300">Username</label>
        <div className="text-xs text-cyan-300 mb-2">
          You can change your username once every 90 days. Changing your username will also update your public profile link (e.g., <span className="font-mono">k9music.com/profile/&lt;new-username&gt;</span>).
        </div>
        <input
          type="text"
          value={username}
          onChange={e => { setUsername(e.target.value.toLowerCase()); setUsernameError(getUsernameValidationError(e.target.value.toLowerCase())); }}
          onFocus={() => setShowUsernameHelp(true)}
          onBlur={() => setShowUsernameHelp(false)}
          className={`block w-full p-3 rounded-lg border border-cyan-700 bg-slate-900 text-cyan-100 focus:ring-2 focus:ring-cyan-400 ${!canChangeUsername ? 'opacity-60 cursor-not-allowed' : ''} ${usernameError ? 'border-red-500' : ''}`}
          autoComplete="off"
          disabled={!canChangeUsername}
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
        {!canChangeUsername && nextChangeDate && (
          <div className="text-xs text-cyan-300 mt-1">
            You can change your username again in {nextChangeDate.days} day{nextChangeDate.days !== 1 ? 's' : ''} (on {nextChangeDate.date.toLocaleDateString()}).
          </div>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-cyan-300">Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onFocus={() => setShowNameHelp(true)}
          onBlur={() => setShowNameHelp(false)}
          className="block w-full p-3 rounded-lg border border-cyan-700 bg-slate-900 text-cyan-100 focus:ring-2 focus:ring-cyan-400"
          autoComplete="off"
          aria-describedby="name-instructions"
        />
        {showNameHelp && (
          <div id="name-instructions" className="text-cyan-400 text-xs mt-1">
            Enter your full name.
          </div>
        )}
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