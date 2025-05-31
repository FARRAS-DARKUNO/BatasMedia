"use client";

import { useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Dummy untuk Related Posts
const OTHER_NEWS = Array.from({ length: 4 }).map((_, i) => ({
  id: i + 201,
  title: `Exciting Travel Spot #${i + 1}`,
  description:
    "Explore this amazing destination filled with culture, nature, and adventure. Don't miss it!",
  image:
    "https://www.koranperdjoeangan.com/wp-content/uploads/2022/08/2019_0101_18132700-01-01.jpeg",
  category: "Travel",
  postBy: "Jane Smith",
  time: "May 2025",
}));

export default function DetailBerita() {
  const news = useMemo(
    () => ({ 
      id: 1,
      title: "Colorful Carnival from Rio",
      updatedAt: new Date().toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      postBy: "John Doe",
      image:
        "https://www.koranperdjoeangan.com/wp-content/uploads/2022/08/2019_0101_18132700-01-01.jpeg",
      content: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore&nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore&nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
        <p><img src="https://www.koranperdjoeangan.com/wp-content/uploads/2022/08/2019_0101_18132700-01-01.jpeg" alt="" width="601" height="401" style="display: block; margin-left: auto; margin-right: auto;"></p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore&nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <table style="border-collapse:collapse;width: 100%;">
          <tbody>
            <tr>
              <td style="width: 10%;">P</td>
              <td style="width: 10%;">p</td>
              <td style="width: 10%;">p</td>
              <td style="width: 10%;"><br></td>
              <td style="width: 10%;"><br></td>
              <td style="width: 10%;"><br></td>
              <td style="width: 10%;"><br></td>
              <td style="width: 10%;"><br></td>
              <td style="width: 10%;"><br></td>
              <td style="width: 10%;"><br></td>
            </tr>
          </tbody>
        </table>
        <p><br></p>
      `,
    }),
    []
  );

  return (
    <main
    className="relative w-full min-h-screen bg-transparent bg-reverse"
    >
      <Header />

      {/* Detail Berita */}
      <section className="container mx-auto px-4 max-w-screen-xl py-14">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* KONTEN UTAMA */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-3">{news.title}</h1>
            <div className="text-sm text-gray-500 mb-4">
              <span>Updated: {news.updatedAt}</span> | <span>By {news.postBy}</span>
            </div>
            <article
              className="prose max-w-none text-gray-800 prose-img:mx-auto prose-table:w-full prose-td:border prose-table:border prose-td:p-2"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>

          {/* RELATED POSTS */}
          <aside className="w-full lg:w-1/3">
            <div className="bg-gray-50 p-4 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Related Posts</h2>
              <ul className="space-y-4">
                {OTHER_NEWS.length === 0 ? (
                  <p className="text-center text-gray-500">Tidak ada berita ditemukan</p>
                ) : (
                  OTHER_NEWS.map(
                    ({ id, title, description, image, category, postBy, time }) => (
                      <article
                        key={id}
                        className="flex flex-col sm:flex-row gap-4 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300 bg-white bg-opacity-70 rounded-lg"
                        tabIndex={0}
                        aria-label={`Berita: ${title}`}
                      >
                        <div className="flex-shrink-0 w-full sm:w-48 relative">
                          <img
                            src={image}
                            alt={title}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover rounded-l-lg"
                            style={{ aspectRatio: "16 / 9" }}
                          />
                        </div>

                        <div className="flex flex-col justify-center p-4 flex-grow">
                          <h3 className="text-sm font-semibold mb-1 hover:text-teal-600">
                            {title}
                          </h3>

                          <div className="flex flex-wrap text-xs text-gray-500 gap-3">
                            <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">
                              {category}
                            </span>
                            <span>{time}</span>
                            <span>By {postBy}</span>
                          </div>
                        </div>
                      </article>
                    )
                  )
                )}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
