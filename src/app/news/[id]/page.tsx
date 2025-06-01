"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";

type Berita = {
  id: string;
  thumbnail: string;
  title: string | null;
  shortDesc: string;
  content: string;
  updateDate: string;
  status: string;
  feedback?: string | null;
  typePriority: string;
  hastag: string;
  user: { username: string };
  category: { categoryName: string };
};

export default function DetailBerita() {
  const params = useParams();
  const beritaId = params?.id; // fallback ID
  const [news, setNews] = useState<Berita | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const res = await fetch(`/api/news/${beritaId}`);
        if (!res.ok) throw new Error("Gagal mengambil data berita");
        const data = await res.json();
        setNews(data);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };
    fetchBerita();
  }, [beritaId]);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (error || !news) {
    return <div className="text-center text-red-500 py-20">Error: {error}</div>;
  }

  const formattedDate = new Date(news.updateDate).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="relative w-full min-h-screen bg-transparent bg-reverse">
      <Header />

      <section className="container mx-auto px-4 max-w-screen-xl py-14">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* KONTEN UTAMA */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2 text-center text-secondary-light">{news.title}</h1>
            <div className="text-sm text-gray-500 mb-4 flex flex-wrap gap-2 text-center justify-center font-bold"> 
              <span>{news.user.username}</span> - 
              <span>{news.category.categoryName}</span> - 
              <span className="text-primary-light">Batas Media</span> 
            </div>
            <div className="text-sm text-gray-500 mb-4 flex flex-wrap text-center justify-center">
              <span>{formattedDate}</span>
            </div>
            <img
              src={news.thumbnail}
              alt={news.title || "Thumbnail"}
              className="w-full  object-cover rounded-xl mb-5"
            />

            <div className="mb-4 text-sm text-primary-light">
              {news.hastag.split(" ").map((tag, idx) => (
                <span key={idx} className="mr-2">#{tag.replace("#", "")}</span>
              ))}
            </div>


            <article
              className="prose max-w-none text-gray-800 prose-img:mx-auto prose-table:w-full prose-td:border prose-table:border prose-td:p-2"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>

          {/* SIDEBAR RELATED POST */}
          <aside className="w-full lg:w-1/3">
            <div className="bg-gray-50 p-4 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Related Posts</h2>
              <p className="text-gray-500 text-sm">Konten terkait akan muncul di sini...</p>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
