'use client';

import dynamic from 'next/dynamic';
import { useState, useRef } from 'react';
import { useParams } from 'next/navigation';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const categories = ['Politik', 'Teknologi', 'Olahraga', 'Hiburan', 'Ekonomi'];

type NewsStatus = 'To Approve' | 'Pending' | 'Revisi' | 'Reject' | 'Approved';

interface NewsDetailProps {
  status: NewsStatus;
  initialData: {
    title: string;
    hashtags: string[];
    shortDesc: string;
    category: string;
    content: string;
  };
  onSubmitEdit?: (data: any) => void;
  onApprove?: (note: string) => void;
  onReject?: (note: string) => void;
}

export default function NewsDetailForm() {
  const [title, setTitle] = useState("id");
  const [hashtags, setHashtags] = useState("dadsa,deffdf,afea,fafae");
  const [shortDesc, setShortDesc] = useState("apa lah ini ");
  const [category, setCategory] = useState("makan");
  const [status, Setstatus] = useState("To ss");
  const editor = useRef(null);
  const [content, setContent] = useState("banyak");
  const [note, setNote] = useState('');

  const params = useParams();
  const id = params?.id;

  const isEditable = status === 'Revisi';
  const isToApprove = status === 'To Approve';

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSubmitEdit?.({status});
  };

  return (
    <div className="mx-auto px-6 py-8 bg-white rounded-xl shadow-lg ring-1 ring-gray-200">
      <h3 className="text-xl font-extrabold mb-8 text-gray-900 tracking-tight">
        📰 Detail Berita
      </h3>
      <form className="space-y-6" onSubmit={handleEditSubmit}>
        <input
          type="text"
          placeholder="Judul"
          disabled={!isEditable}
          className="w-full p-4 border border-gray-300 rounded-xl shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Hashtag (pisahkan dengan koma)"
          disabled={!isEditable}
          className="w-full p-4 border border-gray-300 rounded-xl shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          value={hashtags}
          onChange={e => setHashtags(e.target.value)}
        />
        <textarea
          placeholder="Deskripsi singkat (max 50 karakter)"
          disabled={!isEditable}
          className="w-full p-4 border border-gray-300 rounded-xl shadow-sm resize-none placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          rows={3}
          maxLength={50}
          value={shortDesc}
          onChange={e => setShortDesc(e.target.value)}
        />
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Kategori</label>
          <select
            disabled={!isEditable}
            className="w-full p-4 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Isi Berita</label>
          <div className="rounded-xl border border-gray-300 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition">
            <JoditEditor
              ref={editor}
              value={content}
              onChange={newContent => setContent(newContent)}
              config={{ readonly: !isEditable, height: 400, toolbarSticky: false, spellcheck: true }}
            />
          </div>
        </div>

        {isEditable && (
          <button
            type="submit"
            className="w-auto py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-md transition-transform active:scale-95"
          >
            Submit Revisi
          </button>
        )}

        {isToApprove && (
          <div className="space-y-4">
            <textarea
              placeholder="Catatan (opsional)"
              className="w-full p-4 border border-gray-300 rounded-xl shadow-sm resize-none placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              rows={3}
              value={note}
              onChange={e => setNote(e.target.value)}
            />
            <div className="flex gap-4">
              <button
                type="button"
                // onClick={() => onApprove?.(note)}
                className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl shadow-md transition-transform active:scale-95"
              >
                Approve
              </button>
              <button
                type="button"
                // onClick={() => onReject?.(note)}
                className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-md transition-transform active:scale-95"
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
