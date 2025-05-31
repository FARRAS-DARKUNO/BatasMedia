'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';


type NewsStatus = 'To Approve' | 'Pending' | 'Revisi' | 'Reject' | 'Approved';

type News = {
  id: string;
  title: string;
  status: NewsStatus;
  feedback?: string;
  updatedAt: string;
  username: string;
};

export default function TaskPage() {
  const [activeTab, setActiveTab] = useState<NewsStatus>('Pending');
  const router = useRouter();

  const dummyData: News[] = [
    {
      id: '1',
      title: 'Update COVID-19 2025',
      status: 'Revisi',
      feedback: 'Tolong tambahkan data terbaru WHO.',
      updatedAt: '2025-05-22',
      username: 'editor_covid',
    },
    {
      id: '2',
      title: 'Berita Ekonomi Tidak Netral',
      status: 'Reject',
      feedback: 'Berita tidak layak tayang karena tidak netral.',
      updatedAt: '2025-05-20',
      username: 'reviewer_keuangan',
    },
    {
      id: '3',
      title: 'Persetujuan Berita Teknologi',
      status: 'Approved',
      updatedAt: '2025-05-18',
      username: 'admin_tekno',
    },
    {
      id: '4',
      title: 'Draft Berita Olahraga',
      status: 'Pending',
      updatedAt: '2025-05-23',
      username: 'user_sport',
    },
    {
      id: '5',
      title: 'Berita Hiburan Menunggu Persetujuan',
      status: 'To Approve',
      updatedAt: '2025-05-21',
      username: 'editor_entertainment',
    },
  ];

  const filtered = dummyData.filter((item) => item.status === activeTab);

  return (
    <div className="mx-auto px-6 py-8 bg-white rounded-xl shadow-lg ring-1 ring-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">🧾 Task Berita</h1>

      {/* Tab Bar */}
      <div className="flex flex-wrap gap-3 mb-6">
        {['To Approve', 'Pending', 'Revisi', 'Reject', 'Approved'].map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status as NewsStatus)}
            className={`px-5 py-2 text-sm font-semibold rounded-full transition border shadow-sm ${activeTab === status
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300'
              }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table View */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 italic">Tidak ada berita untuk status ini.</p>
      ) : (
        <div className="overflow-auto max-w-full">
          <table className="min-w-full table-auto border border-gray-200 text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-2 border w-12">No</th>
                <th className="px-4 py-2 border w-24">Action</th>
                <th className="px-4 py-2 border min-w-[200px]">Title</th>
                <th className="px-4 py-2 border w-40">Updated At</th>
                <th className="px-4 py-2 border min-w-[300px]">Description</th>
                <th className="px-4 py-2 border w-40">Username</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 align-top">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">
                    {item.status === 'Revisi' ? (
                      <button
                      onClick={() => router.push(`/dashboard/news/detail/${item.id}`)}
                        className="px-3 py-1 text-xs font-semibold bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                      onClick={() => router.push(`/dashboard/news/detail/${item.id}`)}
                        className="px-3 py-1 text-xs font-semibold bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Detail
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-2 border break-words">{item.title}</td>
                  <td className="px-4 py-2 border">{item.updatedAt}</td>
                  <td className="px-4 py-2 border break-words">
                    {item.feedback || <span className="text-gray-400 italic">Tidak ada</span>}
                  </td>
                  <td className="px-4 py-2 border">{item.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
