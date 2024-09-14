"use client";

import { useState, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import { updatePassword } from "./actions";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    // Capture token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("access_token");
    if (token) {
      setToken(token);
    } else {
      notFound();
    }
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!token) {
      setError("Invalid token.");
      setLoading(false);
      return;
    }

    try {
      const data = await updatePassword(newPassword);

      if (!data.ok) {
        setError(data.message);
      } else {
        setMessage("Password successfully reset.");
        setTimeout(() => {
          router.push("/auth/login");
        }, 1000);
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!token) return <></>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}
        <form
          onSubmit={handleResetPassword}
          className={loading ? "opacity-50" : ""}
        >
          <div className="mb-4">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded flex items-center justify-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                Resetting...
                <div className="spinner ml-2 !size-4"></div>
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
