'use client';
import MTC from '@/components/MTC';
import { useState, useRef, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { JwtPayload } from '@/lib/auth';
import { PENDING } from '@/data/type';
import { useRouter } from "next/navigation";

export default function CreateNewsPage() {

  const router = useRouter();

  interface Category {
    id: string;
    categoryName: string;
  }

  const [title, setTitle] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [shortDesc, setShortDesc] = useState('');

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedFileBase64, setSelectedFileBase64] = useState<string | null>(null);
  const [priority, setPriority] = useState<string>('');

  const levelOptions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
  ];

  const [content, setContent] = useState('')

  const editor = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token'); // Ambil token dari localStorage
        if (!token) throw new Error('Token tidak ditemukan');

        const res = await fetch('/api/category', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Gagal fetch kategori');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token tidak ditemukan');

      const decoded = jwtDecode<JwtPayload>(token);
  
      const data = {
        thumbnail: selectedFileBase64,
        title,
        shortDesc,
        content,
        updateDate: new Date().toISOString(),
        status: PENDING, // default status misalnya
        typePriority: priority,
        hastag: hashtags,
        idUser: decoded.userId, // ganti dengan user ID jika bisa didapat dari token
        idCategory: selectedCategoryId,
      };
      const res = await fetch('/api/news/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message);
        throw new Error(errorData.message || 'Gagal mengirim berita');
      }
  
      router.push("/dashboard/news/task");

      alert('Berita Sukses disubmit!');
    } catch (error) {
      console.error('Submit error:', error);
      if (error instanceof Error) {
        alert('Gagal kirim berita: ' + error.message);
      } else {
        alert('Gagal kirim berita: Unknown error');
      }
    }
  };

  const setSelectedFileUnion = (value: string | File | null) => {
    if (typeof value === 'string' || value === null) {
      setSelectedFileBase64(value); // Hanya terima string (Base64) atau null
    } else {
      console.warn('File object received, but expected base64 string');
    }
  };

  return (
    <div className="w-full mx-auto px-6 py-8 bg-white rounded-xl shadow-lg ring-1 ring-gray-200">
      <h3 className="text-xl font-extrabold mb-8 text-gray-900 tracking-tight">
        📝 Buat Berita
      </h3>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <MTC.Input.Field
          name='Judul Berita'
          title='Judul Berita'
          maxLength={30}
          magic={{
            type: "text",
            inputValue: title,
            setInputValue: setTitle,
          }}
          placeholder='Judul Berita (Max 30 Character)'
          required
        />
        <MTC.Input.FileUploader
          title="Thumbnail"
          magic={{
            accept: 'image/*',
            selectedFile: selectedFileBase64,
            setSelectedFile: setSelectedFileUnion,
            isConvertBase64: true, // Konversi ke Base64
          }}
        />
        <MTC.Input.Field
          name='Hastag'
          title='Hastag'
          magic={{
            type: "text",
            inputValue: hashtags,
            setInputValue: setHashtags,
          }}
          placeholder='#DipisahkanDenganSpasi'
          required
        />
        <MTC.Input.Description
          name='Hastag'
          title='Hastag'
          magic={{
            inputValue: shortDesc,
            setInputValue: setShortDesc,
          }}
          placeholder='Description (Max 50 Character)'
          maxLength={50}
          required
        />
        <MTC.Input.FieldDropDown
          title="Kategori Berita"
          placeholder="Pilih kategori"
          magic={{
            type: 'select',
            inputValue: selectedCategoryId,
            setInputValue: setSelectedCategoryId,
            errorMessage: 'Kategori tidak valid',
            options: categories.map((c) => ({
              value: c.id,
              label: c.categoryName,
            })),
          }}
        />
        <MTC.Input.FieldDropDown
          title="Level Priority"
          placeholder="Pilih Level"
          name="priority"
          magic={{
            type: 'select',
            inputValue: priority,
            setInputValue: setPriority,
            options: levelOptions,
            errorMessage: 'Pilih level yang valid',
          }}
        />
        <MTC.Input.WYSIWYGEditor
          content={content}
          setContent={setContent}
          width="full"
          spaceX={2}
          spaceY={2}
        />
        <MTC.Button.Normal
          title='Buat Berita'
          buttonType='submit'
        />
      </form>
    </div>
  );
}
