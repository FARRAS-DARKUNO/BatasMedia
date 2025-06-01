'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { APPROVE, PENDING, REJECT, REVISED, SUPERADMIN, TOAPPROVE } from '@/data/type';
import { JwtPayload } from '@/lib/auth';
import { jwtDecode } from 'jwt-decode';


type NewsStatus = typeof PENDING | typeof REVISED | typeof REJECT | typeof APPROVE;

const chouise = [
  {
    title: 'To Approve',
    link: PENDING
  },
  {
    title: 'Pending',
    link: PENDING
  },
  {
    title: 'Approved',
    link: APPROVE
  },
  {
    title: 'Reject',
    link: REJECT
  },
  {
    title: 'Revisi',
    link: REVISED
  },
]

type News = {
  id: string;
  title: string;
  status: NewsStatus;
  feedback?: string;
  updateDate: string;
  shortDesc: string;
  user: { username: string };
};

type ApiResponse = {
  data: News[];
  total: number;
  page: number;
  totalPages: number;
};

export default function TaskPage() {
  const [activeTab, setActiveTab] = useState<string>(PENDING);
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);
  const [titleFilter, setTitleFilter] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(15);

  // Untuk pagination info
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [toDetail, setTodetail] = useState(PENDING);
  const [isSuperAdmin, setSuperAdmin] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token tidak ditemukan');

        const decoded = jwtDecode<JwtPayload>(token);

        if (decoded.role == SUPERADMIN) {
          setTodetail(TOAPPROVE)
          setSuperAdmin(true)
        }

        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          status: activeTab,
        });

        if (titleFilter) {
          params.append('title', titleFilter);
        }

        const res = await fetch(`/api/news?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Gagal fetch data');

        const data: ApiResponse = await res.json();

        setNewsList(data.data);
        setTotalPages(data.totalPages);
        setTotalItems(data.total);
      } catch (error: any) {
        console.error('Fetch error:', error?.message || error);
        setNewsList([]);
        setTotalPages(1);
        setTotalItems(0);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [activeTab, page, titleFilter]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="w-full mx-auto px-6 py-8 bg-white rounded-xl shadow-lg ring-1 ring-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">🧾 Task Berita</h1>

      {/* Tab Filter */}
      <div className="flex flex-wrap gap-3 mb-4">
        {chouise.map((status) => {
          if (isSuperAdmin && status.title != 'Pending') {
            return (
              <button
                key={status.title}
                onClick={() => {
                  setActiveTab(status.link);
                  setPage(1); // reset ke halaman 1 saat ubah tab
                }}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition border shadow-sm ${activeTab === status.link
                  ? 'bg-primary text-white border-primary'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300'
                  }`}
              >
                {status.title}
              </button>
            )
          }
          else if (!isSuperAdmin && status.title != 'To Approve') {
            return (
              <button
                key={status.title}
                onClick={() => {
                  setActiveTab(status.link);
                  setPage(1); // reset ke halaman 1 saat ubah tab
                }}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition border shadow-sm ${activeTab === status.link
                  ? 'bg-primary text-white border-primary'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300'
                  }`}
              >
                {status.title}
              </button>
            )
          }
        })}
      </div>

      {/* Search Title */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari judul berita..."
          value={titleFilter}
          onChange={(e) => {
            setTitleFilter(e.target.value);
            setPage(1);
          }}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Tabel */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : newsList.length === 0 ? (
        <p className="text-gray-500 italic">Tidak ada berita untuk status ini.</p>
      ) : (
        <>
          <div className="overflow-auto max-w-full">
            <table className="min-w-full table-auto border border-gray-200 text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-2 border w-12">No</th>
                  <th className="px-4 py-2 border w-24">Action</th>
                  <th className="px-4 py-2 border min-w-[200px]">Title</th>
                  <th className="px-4 py-2 border w-40">Updated At</th>
                  <th className="px-4 py-2 border min-w-[300px]">Description</th>
                  {
                    (activeTab != PENDING) ?
                      <th className="px-4 py-2 border min-w-[300px]">Note</th>
                      : null
                  }
                  <th className="px-4 py-2 border w-40">Username</th>
                </tr>
              </thead>
              <tbody>
                {newsList.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 align-top">
                    <td className="px-4 py-2 border">{index + 1 + (page - 1) * limit}</td>
                    <td className="px-4 py-2 border">
                      {item.status === REVISED ? (
                        <button
                          onClick={() => router.push(`/dashboard/news/detail/${item.id}?status=${REVISED}`)}
                          className="px-3 py-1 text-xs font-semibold bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            activeTab == PENDING
                              ? router.push(`/dashboard/news/detail/${item.id}?status=${toDetail}`)
                              : router.push(`/dashboard/news/detail/${item.id}?status=Detail`)

                          }}
                          className="px-3 py-1 text-xs font-semibold bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Detail
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-2 border break-words">{item.title}</td>
                    <td className="px-4 py-2 border">{item.updateDate.slice(0, 10)}</td>
                    <td className="px-4 py-2 border break-words">
                      {item.shortDesc}
                    </td>
                    {
                      (activeTab != PENDING) ?
                        <td className="px-4 py-2 border">{item.feedback}</td>
                        : null
                    }
                    <td className="px-4 py-2 border">{item.user.username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={page <= 1}
              className={`px-4 py-2 rounded-md font-semibold ${page <= 1
                ? 'bg-gray-300 cursor-not-allowed text-gray-600'
                : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
              Prev
            </button>

            <span className="text-gray-700">
              Halaman {page} dari {totalPages} — Total {totalItems} berita
            </span>

            <button
              onClick={handleNext}
              disabled={page >= totalPages}
              className={`px-4 py-2 rounded-md font-semibold ${page >= totalPages
                ? 'bg-gray-300 cursor-not-allowed text-gray-600'
                : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
