'use client';
import dynamic from 'next/dynamic';
import { useState, useRef } from 'react';

const categories = ['Politik', 'Teknologi', 'Olahraga', 'Hiburan', 'Ekonomi'];
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function CreateNewsPage() {
  const [title, setTitle] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title,
      hashtags: hashtags.split(',').map(h => h.trim()).filter(Boolean),
      shortDesc,
      category,
      content,
    };
    console.log('Submit data:', data);
    alert('Berita berhasil disubmit!');
  };

  return (
    <div className=" mx-auto px-6 py-8 bg-white rounded-xl shadow-lg ring-1 ring-gray-200">
      <h3 className="text-xl font-extrabold mb-8 text-gray-900 tracking-tight">
        📝 Buat Berita
      </h3>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Judul"
          className="w-full p-4 border border-gray-300 rounded-xl shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Hashtag (pisahkan dengan koma)"
          className="w-full p-4 border border-gray-300 rounded-xl shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          value={hashtags}
          onChange={e => setHashtags(e.target.value)}
        />
        <textarea
          placeholder="Deskripsi singkat (max 50 karakter)"
          className="w-full p-4 border border-gray-300 rounded-xl shadow-sm resize-none placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          rows={3}
          maxLength={50}
          value={shortDesc}
          onChange={e => setShortDesc(e.target.value)}
          required
        />
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Kategori
          </label>
          <select
            className="w-full p-4 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Isi Berita
          </label>
          <div className="rounded-xl border border-gray-300 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition">
            <JoditEditor
              ref={editor}
              value={content}
              onChange={newContent => setContent(newContent)}
              config={{
                readonly: false,
                height: 400,
                toolbarSticky: false,
                spellcheck: true,
              }}
            />
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Output HTML:
            </h2>
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-700 whitespace-pre-wrap break-words">
              {content || <i className="text-gray-400">Belum ada isi...</i>}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-auto py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold rounded-2xl shadow-md transition-transform active:scale-95"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
