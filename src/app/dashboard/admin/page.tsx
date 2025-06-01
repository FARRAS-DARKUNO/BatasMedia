'use client';

import { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { useRouter } from 'next/navigation';


type Admin = {
  id: string;
  username: string;
  fullName: string;
  noWA: string;
  role: string;
  image: string | null;
  startDate: string;
};

export default function ManageAdminPage() {
  const router = useRouter();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem('token'); // atau pakai cookie jika JWT disimpan di sana
        if (!token) {
          setError('Tidak ada token');
          setLoading(false);
          return;
        }

        const res = await fetch('/api/auth/register/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Gagal memuat data admin');
        }

        const data = await res.json();
        setAdmins(data);
      } catch (err: any) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div className="mx-auto w-full px-6 py-8 bg-white rounded-xl shadow-lg ring-1 ring-gray-200">
      <h1 className="text-xl font-bold">👥 Kelola Admin</h1>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 my-3 rounded-lg shadow transition"
        onClick={() => router.push(`/dashboard/admin/add`)}>
        + Tambah Admin
      </button>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : admins.length === 0 ? (
        <p className="text-gray-500">Tidak ada admin yang terdaftar.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {admins.map((admin) => (
            <div
              key={admin.id}
              className="bg-white rounded-xl shadow hover:shadow-md transition p-5 flex flex-col items-center text-center"
            >
              <img
                src={admin.image || '/default-avatar.png'}
                alt={admin.username}
                className="w-20 h-20 rounded-full object-cover mb-4 border"
              />
              <h3 className="text-lg font-semibold">{admin.fullName}</h3>
              <p className="text-gray-500 text-sm">{admin.username}</p>
              <p className="text-gray-400 text-sm">{admin.role}</p>

              <div className="mt-4 flex justify-center items-center w-full gap-2">
                <button
                  className="flex px-3 py-1 text-xs font-semibold bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                  onClick={() => router.push(`/dashboard/admin/${admin.id}`)}
                >
                  <FiEdit className="w-4 h-4 mr-1" />
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
