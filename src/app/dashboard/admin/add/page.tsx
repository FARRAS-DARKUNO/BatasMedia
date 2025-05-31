'use client';

import { useState } from 'react';

export default function AddAdminForm() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!photo) return alert('Silakan upload foto');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('photo', photo);

    const res = await fetch('/api/admin/create', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) alert('Admin berhasil ditambahkan!');
    else alert('Gagal menambahkan admin');
  };

  return (
    <form className="space-y-6 w-full mx-auto bg-white p-6 rounded-2xl shadow" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-gray-800">Tambah Akun Admin</h2>

      <input
        type="text"
        placeholder="Nama Lengkap"
        className="w-full p-4 border border-gray-300 rounded-xl shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Username"
        className="w-full p-4 border border-gray-300 rounded-xl shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full p-4 border border-gray-300 rounded-xl shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="file"
        accept="image/*"
        className="w-full p-4 border border-gray-300 rounded-xl shadow-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        onChange={(e) => setPhoto(e.target.files?.[0] || null)}
        required
      />

      <button
        type="submit"
        className=" bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition shadow text-sm"
      >
        Simpan Admin
      </button>
    </form>
  );
}
