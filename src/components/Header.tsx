"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 max-w-screen-xl flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-blue-600 tracking-tight">
          🌍 <span className="text-gray-800">WorldMap</span>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex space-x-8 items-center text-sm font-medium">
          {["Home", "About Us", "Categories", "News", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-gray-700 relative group transition"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
            Subscribe
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button className="text-gray-700 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
