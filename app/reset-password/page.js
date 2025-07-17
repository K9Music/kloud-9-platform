"use client";
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/login'), 3000);
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('Server error.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
      <Header />
      <div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-0">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 sm:p-8 glassmorphism rounded-2xl shadow-2xl text-white animate-fade-in-slide-up border border-white/10"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
          {success ? (
            <div className="text-green-400 text-center font-semibold">
              Your password has been reset! Redirecting to login...
            </div>
          ) : (
            <>
              <div className="mb-5">
                <label htmlFor="newPassword" className="block mb-1 font-semibold text-cyan-200">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full p-3 rounded-lg border border-cyan-400 bg-slate-900 text-white focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 focus:outline-none"
                  required
                  autoComplete="new-password"
                  placeholder="Enter new password"
                  disabled={loading}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="confirmPassword" className="block mb-1 font-semibold text-cyan-200">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full p-3 rounded-lg border border-cyan-400 bg-slate-900 text-white focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 focus:outline-none"
                  required
                  autoComplete="new-password"
                  placeholder="Confirm new password"
                  disabled={loading}
                />
              </div>
              {error && <div className="mb-4 text-red-400 text-center font-semibold">{error}</div>}
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold text-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                disabled={loading}
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
} 