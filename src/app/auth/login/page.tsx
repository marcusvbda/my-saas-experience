"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login, logout } from "./actions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await login(email, password);
      if (!data.ok) {
        setError(data.message);
      } else {
        setMessage("Login successful!");
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

  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}
        <form onSubmit={handleLogin} className={loading ? "opacity-50" : ""}>
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
          <div className="mb-6">
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
          <button
            type="submit"
            className={`w-full px-4 py-2 gap-2 font-bold text-white bg-indigo-600 rounded flex items-center justify-center ${
              loading || redirecting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading || redirecting}
          >
            Login
            {(loading || redirecting) && (
              <div className="spinner !size-6 ml-2"></div>
            )}
          </button>
        </form>
        <p className="mt-4 text-center">
          <a
            href="/auth/forgot-password"
            className="text-indigo-400 hover:underline"
          >
            Forgot Password?
          </a>
        </p>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/auth/signup" className="text-indigo-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
