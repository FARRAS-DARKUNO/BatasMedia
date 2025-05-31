'use client';

import Link from 'next/link';
import { useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import {
    FiHome,
    FiFilePlus,
    FiList,
    FiCheckCircle,
    FiUsers,
} from 'react-icons/fi';


const sidebarLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: <FiHome /> },
    { href: '/dashboard/news/create', label: 'Buat Berita', icon: <FiFilePlus /> },
    { href: '/dashboard/news/task', label: 'Task Berita', icon: <FiCheckCircle /> },
    { href: '/dashboard/admin', label: 'Kelola Admin', icon: <FiUsers /> },
];



export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    // State untuk toggle dropdown user
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    // Fungsi toggle dropdown
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <div className="min-h-screen flex bg-gray-50 text-gray-800">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-300 border-r fixed h-screen shadow-sm">
                <div className="px-6 py-6 border-b">
                    <h2 className="text-2xl font-bold text-blue-600">Batas News</h2>
                    <p className="text-sm text-gray-400">Admin Panel</p>
                </div>

                <div className="px-4 pt-4 text-xs text-gray-400 font-semibold">OVERVIEW</div>
                <nav className="p-2 mt-2 space-y-1">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium
                  ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <span className={`text-lg ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                                    {link.icon}
                                </span>
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main */}
            <div className="flex-1 ml-64 p-0">
                <header className="flex justify-between items-center mb-6 px-4 py-3 bg-white shadow-sm border-b border-gray-200 rounded-md relative">
                    <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center gap-2 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                            aria-expanded={dropdownOpen}
                            aria-haspopup="true"
                        >
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                                A
                            </div>
                            <span className="text-gray-700 font-medium">admin</span>
                            <svg
                                className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : 'rotate-0'
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                <button
                                    onClick={() => {
                                        // Logout logic di sini
                                        alert('Logout clicked');
                                        setDropdownOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                <main className='px-3 py-0'>{children}</main>

                <footer className="p-10 text-center">
                    Dibuat oleh <span className="font-semibold text-blue-600">Tim Bakti Taskin</span> © 2025
                </footer>
            </div>
        </div>
    );
}
