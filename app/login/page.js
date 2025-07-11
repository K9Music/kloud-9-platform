'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError('Invalid email or password.');
    } else if (res?.ok) {
      router.push('/profile');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-orange-900 to-teal-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-gray-900 rounded-lg shadow-lg text-orange-100"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-3 rounded-lg border border-gray-300 bg-gray-800 text-orange-100 focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-3 rounded-lg border border-gray-300 bg-gray-800 text-orange-100 focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>
        {error && (
          <div className="mb-4 text-red-400 text-center font-semibold">{error}</div>
        )}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg transition"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
} 