"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendResetEmail } from "./action";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await sendResetEmail(email);
      if (!data.ok) {
        setError(data.message);
      } else {
        setMessage("Password reset link sent to your email.");
        setRedirecting(true);
        // Wait 2 seconds before redirecting
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}
        <form
          onSubmit={handleForgotPassword}
          className={loading ? "opacity-50" : ""}
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading || redirecting}
            />
          </div>
          <button
            type="submit"
            className={`w-full flex justify-center items-center gap-2 px-4 py-2 font-bold text-white bg-indigo-600 rounded ${
              loading || redirecting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading || redirecting}
          >
            {loading ? "Sending..." : "Send Password Reset Link"}
            {(loading || redirecting) && (
              <div className="spinner !size-6 ml-2"></div>
            )}
          </button>
        </form>
        <p className="mt-4 text-center">
          <a href="/auth/login" className="text-indigo-400 hover:underline">
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
