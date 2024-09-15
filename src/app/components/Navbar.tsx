"use client";

import Link from "next/link";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Navbar({ isLogged = false, userEmail }: any) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <header className="bg-gray-800 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href={isLogged ? "/application" : "/"} className="cursor-pointer">
          <h1 className="text-2xl font-bold">My SaaS</h1>
        </Link>
        <ul className="flex space-x-4 items-center">
          {!isLogged && (
            <>
              <li>
                <Link href="/" className="hover:text-indigo-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-indigo-400">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="hover:text-indigo-400">
                  Sign Up
                </Link>
              </li>
            </>
          )}
          {isLogged && (
            <li
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center space-x-1 hover:text-indigo-400">
                <span>{userEmail}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              {dropdownOpen && (
                <ul className="absolute right-0 w-48 bg-gray-700 rounded-md shadow-lg">
                  <li>
                    <Link
                      href="/auth/login"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-600"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}
          {!isLogged && (
            <li>
              <Link href="/auth/login" className="hover:text-indigo-400">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
