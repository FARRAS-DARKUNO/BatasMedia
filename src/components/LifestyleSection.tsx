"use client";

import { useState, useMemo } from "react";

const CATEGORIES = ["Semua", "Travel", "Culture", "Food", "Festival", "Art"];
const AUTHORS = ["John Doe", "Jane Smith", "Alex Johnson", "Maria Garcia"];

const DUMMY_DATA = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  title: `Colorful Carnival from Rio #${i + 1}`,
  description: "Exploring Brazil's most vibrant tradition",
  image:
    "https://www.koranperdjoeangan.com/wp-content/uploads/2022/08/2019_0101_18132700-01-01.jpeg",
  category: CATEGORIES[(i % (CATEGORIES.length - 1)) + 1], // skip "Semua"
  postBy: AUTHORS[i % AUTHORS.length],
  time: new Date(Date.now() - i * 86400000).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }),
}));

const PAGE_SIZE = 10;

export default function LifestyleSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [page, setPage] = useState(1);
  const [filteredData, setFilteredData] = useState(DUMMY_DATA);

  const handleSearch = () => {
    let filtered = DUMMY_DATA;

    if (selectedCategory !== "Semua") {
      filtered = filtered.filter(
        (item) => item.category === selectedCategory
      );
    }

    if (searchTerm.trim() !== "") {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(lower) ||
          item.description.toLowerCase().includes(lower) ||
          item.postBy.toLowerCase().includes(lower)
      );
    }

    setFilteredData(filtered);
    setPage(1);
  };

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [filteredData, page]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  return (
    <section className="mt-10 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 border-b border-gray-300 pb-2">
        LIFESTYLE
      </h2>

      {/* Search bar */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:gap-3">
        <input
          type="text"
          placeholder="Cari berita..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          aria-label="Search berita lifestyle"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="mt-2 sm:mt-0 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          aria-label="Filter kategori berita"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          className="mt-2 sm:mt-0 px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition"
          aria-label="Tombol cari berita"
        >
          Search
        </button>
      </div>

      {/* List Cards */}
      <div className="flex flex-col gap-6">
        {paginated.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada berita ditemukan</p>
        ) : (
          paginated.map(
            ({ id, title, description, image, category, postBy, time }) => (
              <article
                key={id}
                className="flex flex-col sm:flex-row gap-4 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300"
                tabIndex={0}
                aria-label={`Berita: ${title}`}
                style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
              >
                <div className="flex-shrink-0 w-full sm:w-48 relative">
                  <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ aspectRatio: "16 / 9" }}
                  />
                </div>

                <div className="flex flex-col justify-center p-4 flex-grow">
                  <h3 className="text-xl font-semibold mb-1 hover:text-teal-600">
                    {title}
                  </h3>
                  <p className="text-gray-600 mb-3">{description}</p>
                  <div className="flex flex-wrap text-xs text-gray-500 gap-3">
                    <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">
                      {category}
                    </span>
                    <span>By {postBy}</span>
                    <span>{time}</span>
                  </div>
                </div>
              </article>
            )
          )
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-8 flex flex-wrap justify-center items-center gap-3"
        >
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            aria-disabled={page === 1}
            className={`px-4 py-2 rounded-md font-semibold min-w-[60px] ${
              page === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-teal-500 text-white hover:bg-teal-600"
            }`}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : undefined}
              className={`px-4 py-2 rounded-md font-semibold min-w-[40px] ${
                page === i + 1
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            aria-disabled={page === totalPages}
            className={`px-4 py-2 rounded-md font-semibold min-w-[60px] ${
              page === totalPages
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-teal-500 text-white hover:bg-teal-600"
            }`}
          >
            Next
          </button>
        </nav>
      )}
    </section>
  );
}
