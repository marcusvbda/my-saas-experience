// app/home/page.tsx
"use client";

import Link from "next/link";
import Navbar from "./components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <section className="text-center">
          <h2 className="text-4xl font-bold mb-4 mt-10">Welcome to My SaaS</h2>
          <p className="mb-4 text-lg">
            Our platform uses artificial intelligence to enhance your daily
            routine. Receive daily notifications to remind you of small tasks
            that help you achieve personal and professional goals, including
            financial management, learning, personal development, work tasks,
            and more.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/pricing"
              className="px-6 py-3 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-500 transition"
            >
              View Pricing
            </Link>
            <Link
              href="/auth/signup"
              className="px-6 py-3 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-500 transition"
            >
              Sign Up
            </Link>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 p-4 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} My SaaS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
