'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import MTC from '@/components/MTC';
import { APPROVE, PENDING, REJECT, REVISED, TOAPPROVE } from '@/data/type';
import { useRouter } from "next/navigation";


type NewsStatus =  typeof PENDING | typeof REVISED | typeof REJECT | typeof APPROVE | typeof TOAPPROVE;

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = params?.id as string;

  const [title, setTitle] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [note, setNote] = useState('');
  const [categories, setCategories] = useState<{ id: string, categoryName: string }[]>([]);

  const [isEditable, setisEditable] = useState<boolean>(false);
  const [isToApprove, setisToApprove] = useState<boolean>(false);


  // Ambil status dari query param jika ada
  useEffect(() => {
    const statusParam = searchParams.get('status') as NewsStatus | null;
    if (statusParam) {
      if(statusParam === REVISED){
        setisEditable(true)
      }
      if(statusParam === TOAPPROVE){
        setisToApprove(true)
      }
    }
  }, [searchParams]);

  // Fetch berita by ID dan kategori
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/news/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        if (!res.ok) throw new Error('Gagal fetch detail');
        const data = await res.json();
        setTitle(data.title);
        setHashtags(data.hastag || '');
        setShortDesc(data.shortDesc);
        setContent(data.content);
        setThumbnail(data.thumbnail);
        // setStatus(data.status);
        setCategory(data.idCategory || '');
        setPriority(data.typePriority || '');
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/category`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        if (!res.ok) throw new Error('Gagal fetch kategori');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (id) {
      fetchDetail();
      fetchCategories();
    }
  }, [id]);

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("Token tidak ditemukan");
  
      const res = await fetch(`/api/news/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          hastag: hashtags,
          shortDesc,
          content,
          thumbnail,
          typePriority: priority,
          idCategory: category,
          status: PENDING, // atau REVISED tergantung logikamu
          updateDate: new Date().toISOString(), // opsional jika backend handle otomatis
        }),
      });
  
      if (!res.ok) {
        throw new Error("Gagal mengirim revisi berita");
      }
  
      alert("Berita berhasil direvisi!");
      router.push("/dashboard/news/task");
    } catch (error) {
      console.error("Error saat submit revisi:", error);
      alert("Terjadi kesalahan saat submit revisi.");
    }
  };

  const handleSubmit = async (status: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/news/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: status,
          feedback: note
        }),
      });
  
      if (!res.ok) {
        throw new Error('Gagal update status berita');
      }
  
      router.push("/dashboard/news/task");

      alert(`Berita Sukses di ${status}!`);
  
      // Opsional: arahkan ke halaman lain setelah berhasil
      // router.push('/admin/news'); atau tampilkan notifikasi sukses
    } catch (error) {
      console.error('Error saat update status:', error);
      // Tampilkan notifikasi error ke pengguna jika perlu
    }
  };

  return (
    <div className="w-full mx-auto px-6 py-8 bg-white rounded-xl shadow-lg ring-1 ring-gray-200">
      <h3 className="text-xl font-extrabold mb-8 text-gray-900 tracking-tight">
        📰 Detail Berita
      </h3>
      <form className="space-y-6" onSubmit={handleSubmitEdit}>
        <MTC.Input.Field
          title="Judul"
          magic={{
            type: "text",
            inputValue: title,
            setInputValue: setTitle,
          }}
          placeholder="Judul Berita"
          disable={!isEditable}
        />

        {thumbnail && (
          <div className="w-full h-60 overflow-hidden rounded-lg border">
            <img src={thumbnail} alt="Thumbnail" className="object-cover w-full h-full" />
          </div>
        )}

        <MTC.Input.Field
          title="Hashtags"
          magic={{
            type: "text",
            inputValue: hashtags,
            setInputValue: setHashtags,
          }}
          placeholder="#DipisahkanDenganKoma"
          disable={!isEditable}
        />

        <MTC.Input.Description
          title="Deskripsi Singkat"
          magic={{
            inputValue: shortDesc,
            setInputValue: setShortDesc,
          }}
          placeholder="Deskripsi (Max 50 Karakter)"
          maxLength={50}
          disable={!isEditable}
        />

        <MTC.Input.FieldDropDown
          title="Kategori"
          placeholder="Pilih kategori"
          magic={{
            type: 'select',
            inputValue: category,
            setInputValue: setCategory,
            options: categories.map(c => ({
              label: c.categoryName,
              value: c.id,
            })),
            errorMessage: 'Kategori tidak valid',
          }}
          disable={!isEditable}
        />

        <MTC.Input.FieldDropDown
          title="Prioritas"
          placeholder="Pilih Prioritas"
          magic={{
            type: 'select',
            inputValue: priority,
            setInputValue: setPriority,
            options: [
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3', value: '3' },
              { label: '4', value: '4' },
              { label: '5', value: '5' },
            ],
            errorMessage: 'Prioritas tidak valid',
          }}
          disable={!isEditable}
        />

        <MTC.Input.WYSIWYGEditor
          content={content}
          setContent={setContent}
          width="full"
          spaceX={2}
          spaceY={2}
        />

        {isEditable && (
          <MTC.Button.Normal title="Submit Revisi" buttonType="submit" />
        )}

        {isToApprove && (
          <div className="space-y-4">
            <textarea
              placeholder="Catatan (opsional)"
              className="w-full p-4 border border-gray-300 rounded-xl shadow-sm resize-none"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handleSubmit(APPROVE)}
                className="px-6 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition duration-200"
              >
                Approve
              </button>
              <button
                type="button"
                onClick={() => handleSubmit(REVISED)}
                className="px-6 py-2 rounded-xl bg-yellow-600 text-white font-semibold hover:bg-red-700 transition duration-200"
              >
                Revition
              </button>
              <button
                type="button"
                onClick={() => handleSubmit(REJECT)}
                className="px-6 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition duration-200"
              >
                Reject
              </button>
              
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
