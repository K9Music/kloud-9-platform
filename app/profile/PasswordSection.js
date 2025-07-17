import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function PasswordSection({ onSave }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  const passwordRequirements = [
    { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
    { label: "At least one uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
    { label: "At least one lowercase letter", test: (pw) => /[a-z]/.test(pw) },
    { label: "At least one number", test: (pw) => /\d/.test(pw) },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    if (!currentPassword) {
      setError('Current password is required.');
      setSaving(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setSaving(false);
      return;
    }
    for (const req of passwordRequirements) {
      if (!req.test(newPassword)) {
        setError('Password does not meet requirements.');
        setSaving(false);
        return;
      }
    }
    try {
      await onSave({ currentPassword, newPassword });
      setMessage('Password updated!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to update password.');
    }
    setSaving(false);
  };

  const handleCancel = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setMessage('');
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="mb-8 p-6 rounded-lg bg-slate-800 shadow">
        <h3 className="text-lg font-bold mb-4 text-cyan-200">Password & Security</h3>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <label className="block text-sm font-semibold text-cyan-300 mb-1">Password</label>
            <span className="text-base font-normal text-cyan-100 bg-slate-800 rounded px-3 py-2 tracking-widest">********</span>
          </div>
          <button
            type="button"
            className="py-2 px-6 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-md transition ml-4"
            onClick={() => setEditing(true)}
          >
            Change Password
          </button>
        </div>
        {message && <div className="mt-2 text-green-400 text-sm">{message}</div>}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-lg bg-slate-800 shadow">
      <h3 className="text-lg font-bold mb-4 text-cyan-200">Password & Security</h3>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-cyan-300 mb-1">Current Password</label>
        <div className="relative">
          <input
            type={showCurrentPassword ? 'text' : 'password'}
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            className="block w-full p-3 rounded-lg border border-cyan-700 bg-slate-900 text-cyan-100 focus:ring-2 focus:ring-cyan-400 pr-10"
            autoComplete="current-password"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-300"
            onClick={() => setShowCurrentPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-cyan-300 mb-1">New Password</label>
        <div className="relative">
          <input
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="block w-full p-3 rounded-lg border border-cyan-700 bg-slate-900 text-cyan-100 focus:ring-2 focus:ring-cyan-400 pr-10"
            autoComplete="new-password"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-300"
            onClick={() => setShowNewPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-cyan-300 mb-1">Confirm New Password</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="block w-full p-3 rounded-lg border border-cyan-700 bg-slate-900 text-cyan-100 focus:ring-2 focus:ring-cyan-400 pr-10"
            autoComplete="new-password"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-300"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>
      <div className="mb-4">
        <ul className="text-xs text-cyan-300">
          {passwordRequirements.map((req, idx) => (
            <li key={idx} className={req.test(newPassword) ? 'text-green-400' : ''}>
              {req.label}
            </li>
          ))}
        </ul>
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