"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [showMiniHeader, setShowMiniHeader] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowMiniHeader(window.scrollY > 150); // Tampilkan header kecil setelah scroll 150px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    "Home",
    "Nasional",
    "Internasional",
    "Ekonomi",
    "Olahraga",
    "Teknologi",
    "Otomotif",
    "Hiburan",
    "Gaya Hidup",
    "CNN TV",
  ];

  return (
    <>
      {/* === HEADER UTAMA === */}
      <header className="bg-secondary text-white">
        <div className="container mx-auto max-w-screen-xl px-4 py-4 flex justify-between items-center">
          <Image
            src="/logo_batas.png"
            alt="Logo"
            width={150}
            height={30}
            className="object-contain"
            priority
          />
          {/* Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
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
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* NAVBAR UTAMA */}
        <nav className="border-t border-gray-700">
          <div className="container mx-auto max-w-screen-xl px-4">
            <ul
              className={`flex flex-col md:flex-row text-sm font-medium whitespace-nowrap ${
                menuOpen ? "block" : "hidden"
              } md:flex overflow-x-auto`}
            >
              {navItems.map((item) => (
                <li
                  key={item}
                  className="px-3 py-3 hover:bg-gray-800 transition cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* SUB MENU (GRAY) */}
        <div className="bg-primary-light text-black">
          <div className="container mx-auto max-w-screen-xl px-4 py-2 flex gap-2 overflow-x-auto text-sm font-semibold whitespace-nowrap">
            {["Greennovation", "PSG", "Ormas", "Timnas Indonesia", "Longsor Cirebon"].map((sub, i) => (
              <span key={i} className=" text-white px-3 py-1 rounded">
                {sub}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* === MINI STICKY HEADER === */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-secondary-light text-white shadow-md transition-transform duration-300 ${
          showMiniHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto max-w-screen-xl px-4 py-2 flex justify-between items-center">
          <Image
            src="/logo_batas.png"
            alt="Logo Mini"
            width={100}
            height={20}
            className="object-contain"
          />
          <ul className="hidden md:flex gap-4 text-sm">
            {navItems.slice(0, 6).map((item) => (
              <li key={item} className="hover:text-gray-300 cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
