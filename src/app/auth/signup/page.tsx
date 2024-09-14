"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "./action";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const data = await signup(email, password);
      if (!data.ok) {
        setError(data.message);
      } else {
        setMessage(
          "Sign up successful! You can now use the system for 7 days for free."
        );
        setRedirecting(true);

        setTimeout(() => {
          router.push("/application");
        }, 1000);
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
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}
        <form onSubmit={handleSignup} className={loading ? "opacity-50" : ""}>
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
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading || redirecting}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading || redirecting}
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 gap-2 font-bold text-white bg-indigo-600 rounded flex items-center justify-center ${
              loading || redirecting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading || redirecting}
          >
            Sign Up
            {(loading || redirecting) && (
              <div className="spinner !size-6 ml-2" />
            )}
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/auth/login" className="text-indigo-400 hover:underline">
            Login
          </a>
        </p>
        <p className="mt-4 text-center text-sm text-gray-400">
          You can use the system for free for 7 days. After that, you'll need to
          choose a plan.
        </p>
      </div>
    </div>
  );
};

export default Signup;
