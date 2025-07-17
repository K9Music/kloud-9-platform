"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
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
          <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
          {success ? (
            <div className="text-green-400 text-center font-semibold">
              If an account with that email exists, a password reset link has been sent.
            </div>
          ) : (
            <>
              <div className="mb-5">
                <label htmlFor="email" className="block mb-1 font-semibold text-cyan-200">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full p-3 rounded-lg border border-cyan-400 bg-slate-900 text-white focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 focus:outline-none"
                  required
                  autoComplete="email"
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>
              {error && <div className="mb-4 text-red-400 text-center font-semibold">{error}</div>}
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold text-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
} 