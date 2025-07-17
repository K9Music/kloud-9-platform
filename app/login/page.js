'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
      <Header />
      <div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-0">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 sm:p-8 glassmorphism rounded-2xl shadow-2xl text-white animate-fade-in-slide-up border border-white/10"
          autoComplete="off"
        >
          <div className="flex flex-col items-center mb-8">
            <span className="text-xl font-bold text-white mb-2">Sign In</span>
            <span className="text-cyan-200 text-sm italic">Welcome back! Please sign in to your account.</span>
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-1 font-semibold text-cyan-200">
              Email or Username
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-3 rounded-lg border border-cyan-400 bg-slate-900 text-white focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 focus:outline-none"
              required
              placeholder="you@email.com or username"
            />
          </div>
          <div className="mb-2 relative">
            <label htmlFor="password" className="block mb-1 font-semibold text-cyan-200">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full p-3 rounded-lg border border-cyan-400 bg-slate-900 text-white focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 focus:outline-none pr-10"
                required
                autoComplete="current-password"
                placeholder="Your password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-300 focus:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center mb-6">
            <Link href="/forgot-password" className="text-cyan-300 text-sm hover:underline focus:outline-none focus:underline">Forgot password?</Link>
          </div>
          {error && (
            <div className="mb-4 text-red-400 text-center font-semibold">{error}</div>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold text-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <div className="mt-8 text-center text-cyan-200 text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/create-profile" className="text-cyan-300 font-semibold hover:underline focus:outline-none focus:underline">Sign up</Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
} 