'use client';

import { useState } from 'react';
import { FiEdit } from 'react-icons/fi'; // Import ikon edit
import { useRouter } from 'next/navigation';

type Admin = {
  id: string;
  username: string;
  email: string;
  photoUrl: string;
};

export default function ManageAdminPage() {
  const router = useRouter();
  const [admins] = useState<Admin[]>([
    {
      id: '1',
      username: 'john_doe',
      email: 'john@example.com',
      photoUrl: '/default-avatar.png',
    },
    {
      id: '2',
      username: 'jane_admin',
      email: 'jane@example.com',
      photoUrl: '/default-avatar.png',
    },
  ]);

  return (
    <div className="mx-auto px-6 py-8 bg-white rounded-xl shadow-lg ring-1 ring-gray-200">
      
      <h1 className="text-xl font-bold">👥 Kelola Admin</h1>

      <button 
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 my-3 rounded-lg shadow transition"
      onClick={() => router.push(`/dashboard/admin/add`)} >
        + Tambah Admin
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {admins.map((admin) => (
          <div
            key={admin.id}
            className="bg-white rounded-xl shadow hover:shadow-md transition p-5 flex flex-col items-center text-center"
          >
            <img
              src={admin.photoUrl}
              alt={admin.username}
              className="w-20 h-20 rounded-full object-cover mb-4 border"
            />
            <h3 className="text-lg font-semibold">{admin.username}</h3>
            <p className="text-gray-500 text-sm">{admin.email}</p>

            <div className="mt-4 flex justify-center items-center w-full gap-2">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                Admin
              </span>
              <button className=" flex px-3 py-1 text-xs font-semibold bg-blue-500 text-white rounded-xl hover:bg-blue-600">
                <FiEdit className="w-4 h-4 mr-1" />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
