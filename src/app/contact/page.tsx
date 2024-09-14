"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { sendContact } from "./actions";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const data = await sendContact(name, email, message);
    if (!data.ok) {
      setError(data.message);
    } else {
      setSuccess(
        "Message sent successfully! We will get back to you as soon as possible."
      );
      setName("");
      setEmail("");
      setMessage("");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <section className="text-center">
          <h2 className="text-4xl font-bold mb-6 mt-10">Contact Us</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 p-6 rounded-lg mx-auto max-w-lg"
          >
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
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
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                required
                disabled={loading}
              ></textarea>
            </div>
            <button
              type="submit"
              className={`w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded flex items-center justify-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="spinner !size-6 mr-2" />
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
