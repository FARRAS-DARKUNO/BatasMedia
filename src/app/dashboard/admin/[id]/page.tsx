'use client';

import MTC from '@/components/MTC';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ADMIN, SUPERADMIN } from '@/data/type';

export default function EditAdminPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [noWA, setNoWA] = useState('');
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [role, setRole] = useState(ADMIN);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token tidak ditemukan');

        const res = await fetch(`/api/auth/register/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Gagal mengambil data admin');
        }

        const data = await res.json();
        setFullName(data.fullName || '');
        setUsername(data.username || '');
        setNoWA(data.noWA || '');
        setPhotoBase64(data.image || null);
        setRole(data.role || ADMIN);
        setLoading(false);
      } catch (error) {
        console.error(error);
        alert('Gagal memuat data admin');
        router.push('/dashboard/admin');
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token tidak ditemukan');

      const data = {
        fullName,
        username,
        password: password || undefined, // kosong berarti tidak update password
        noWA,
        image: photoBase64,
        role,
      };

      const res = await fetch(`/api/auth/register/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.message || 'Gagal mengedit admin');
        return;
      }

      alert('Admin berhasil diperbarui!');
      router.push('/dashboard/admin');
    } catch (err) {
      console.error('Submit error:', err);
      alert('Gagal mengedit admin');
    }
  };

  const setPhotoUnion = (value: string | File | null) => {
    if (typeof value === 'string' || value === null) {
      setPhotoBase64(value);
    } else {
      console.warn('File object received, expected base64 string');
    }
  };

  const roleOptions = [
    { label: 'Admin', value: ADMIN },
    { label: 'Super Admin', value: SUPERADMIN },
  ];

  if (loading) return <p className="text-center py-8">Loading...</p>;

  return (
    <div className="w-full mx-auto px-6 py-8 bg-white rounded-xl shadow-lg ring-1 ring-gray-200">
      <h3 className="text-xl font-extrabold mb-8 text-gray-900 tracking-tight">✏️ Edit Admin</h3>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <MTC.Input.Field
          name="Nama Lengkap"
          title="Nama Lengkap"
          magic={{
            type: "text",
            inputValue: fullName,
            setInputValue: setFullName,
          }}
          placeholder="Nama lengkap admin"
          required
        />
        <MTC.Input.Field
          name="Username"
          title="Username"
          magic={{
            type: "text",
            inputValue: username,
            setInputValue: setUsername,
          }}
          placeholder="Username unik admin"
          required
        />
        <MTC.Input.Field
          name="Password"
          title="Password (biarkan kosong jika tidak diganti)"
          magic={{
            type: "password",
            inputValue: password,
            setInputValue: setPassword,
            errorMessage: "Password tidak valid",
            regex: /^.{6,}$/,
          }}
          placeholder="Minimal 6 karakter"
        />
        <MTC.Input.Field
          name="Nomor WA"
          title="Nomor WhatsApp"
          magic={{
            type: "text",
            inputValue: noWA,
            setInputValue: setNoWA,
          }}
          placeholder="Nomor WhatsApp aktif"
          required
        />
        <MTC.Input.FieldDropDown
          title="Role"
          placeholder="Pilih Role"
          name="role"
          magic={{
            type: 'select',
            inputValue: role,
            setInputValue: setRole,
            options: roleOptions,
            errorMessage: 'Role tidak valid',
          }}
          required
        />
        <MTC.Input.FileUploader
          title="Foto Profil"
          magic={{
            accept: 'image/*',
            selectedFile: photoBase64,
            setSelectedFile: setPhotoUnion,
            isConvertBase64: true,
          }}
        />
        <MTC.Button.Normal
          title="Simpan Perubahan"
          buttonType="submit"
        />
      </form>
    </div>
  );
}
