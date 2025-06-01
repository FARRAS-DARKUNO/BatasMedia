"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

interface Berita {
  id: string;
  thumbnail: string;
  title?: string;
  shortDesc: string;
  content: string;
  updateDate: string;
  status: string;
  feedback?: string;
  typePriority: string;
  hastag: string;
  user: {
    id: string;
    username: string;
  };
  category: {
    id: string;
    name: string;
  };
}

export default function HomePage() {
  const [priority1, setPriority1] = useState<Berita | null>(null);
  const [priority2, setPriority2] = useState<Berita[]>([]);

  const idCategory = "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/news/bignews${idCategory ? `?idCategory=${idCategory}` : ""}`);
        const data = await res.json();
        setPriority1(data.priority1);
        setPriority2(data.priority2);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };
    fetchData();
  }, [idCategory]);

  return (
    <main className="w-full min-h-screen bg-background-light text-black">
      <Header />
      <div className="container mx-auto px-4 max-w-screen-xl py-7">
        {/* HERO + TERPOPULER */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* HERO */}
          <section className="lg:col-span-2 border rounded-md overflow-hidden bg-white shadow-sm">
            {priority1 && (
              <Link href={`/news/${priority1.id}`} className="grid md:grid-cols-2 hover:underline">
                <img
                  src={priority1.thumbnail}
                  alt={priority1.title ?? "Hero Image"}
                  className="w-full h-auto object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-red-600 font-semibold">{priority1.category.name}</p>
                  <h2 className="text-xl font-bold leading-tight mb-2">
                    {priority1.title}
                  </h2>
                  <p className="text-sm text-gray-600">{priority1.shortDesc}</p>
                </div>
              </Link>
            )}
          </section>

          {/* TERPOPULER */}
          <aside>
            <h3 className="text-lg font-bold border-b-2 border-red-600 inline-block mb-4">
              TERPOPULER
            </h3>
            <ol className="space-y-4">
              {priority2.map((item, i) => (
                <li key={item.id} className="flex items-start gap-2">
                  <span className="text-gray-400 text-lg font-bold">{String(i + 1).padStart(2, "0")}</span>
                  <Link href={`/news/${item.id}`} className="hover:underline">
                    <div>
                      <p className="text-sm font-semibold leading-tight">{item.title}</p>
                      <p className="text-xs text-red-600">{item.category.name}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </aside>
        </div>

        {/* BERITA UTAMA LAINNYA */}
        <div className="w-full mt-6 space-y-6">
          <section>
            <h3 className="text-lg font-bold border-b-2 border-red-600 inline-block mb-4">
              BERITA UTAMA
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {priority2.map((news) => (
                <Link href={`/news/${news.id}`} key={news.id} className="space-y-2 hover:underline">
                  <img
                    src={news.thumbnail}
                    alt={news.title}
                    className="w-full h-32 object-cover rounded"
                  />
                  <p className="text-sm font-semibold">{news.title}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
