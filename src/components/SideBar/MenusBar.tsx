'use client'

import { useState, useEffect } from "react";
import { ADMIN, PerentSideType, SUPERADMIN } from "@/data/type";
import { FiBook, FiCheckCircle, FiFilePlus, FiHome, FiUsers } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {jwtDecode} from 'jwt-decode';
import { JwtPayload } from '@/lib/auth';

interface Props {
    parentActive: PerentSideType;
}

const MenusBar: React.FC<Props> = ({ parentActive }) => {
    const pathname = usePathname();
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode<JwtPayload>(token);
            ;
            if (decoded && decoded.role) {
                setRole(decoded.role);
            } else {
                setRole(null);
            }
        }
    }, []);

    // Data menu untuk ADMIN
    const adminMenu = [
        { href: '/dashboard', label: 'Dashboard', icon: <FiHome /> },
        { href: '/dashboard/news/create', label: 'Buat Berita', icon: <FiFilePlus /> },
        { href: '/dashboard/news/task', label: 'Task Berita', icon: <FiCheckCircle /> },
    ];

    // Data menu untuk SUPERUSER
    const superUserMenu = [
        { href: '/dashboard', label: 'Dashboard', icon: <FiHome /> },
        { href: '/dashboard/news/task', label: 'Task Berita', icon: <FiCheckCircle /> },
        { href: '/dashboard/admin', label: 'Kelola Admin', icon: <FiUsers /> },
        { href: '/dashboard/category', label: 'Kelola Kategori', icon: <FiBook /> },
    ];

    // Pilih menu berdasarkan role
    const MenuData = role === ADMIN ? adminMenu : role === SUPERADMIN ? superUserMenu : [];

    return (
        <>
            {(parentActive == 'Menus-ON' || parentActive == 'Menus-Mini-ON') && (
                <div
                    className={`fixed flex-shrink-0 w-64 bg-background-light  border-indigo-100 
                    transform transition-transform duration-300 ease-in-out border-r-2 shadow-lg rounded-tr-3xl rounded-br-3xl lg:static py-5 px-1
                    ${parentActive === 'Menus-Mini-ON' ? 'mt-[64px] h-[calc(100vh-64px)]' : 'rounded-tr-3xl rounded-br-3xl'} z-50`}
                >
                    <ul className="font-medium">
                        {MenuData.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium
                                        ${isActive ? 'bg-blue-50 text-primary-light' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    <h3 className={`flex items-center p-2 ${isActive ? "text-primary-light" : "text-text rounded-lg  hover:text-primary-light group"}`}>
                                        {link.icon}
                                    </h3>
                                    {link.label}
                                </Link>
                            );
                        })}
                    </ul>
                </div>
            )}
        </>
    );
};

export default MenusBar;
