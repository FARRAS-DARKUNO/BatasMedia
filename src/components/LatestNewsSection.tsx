export default function NewsMasonryGrid() {
  const newsData = [
    {
      title: "Most Popular Nature Photographers",
      category: "Photography",
      description:
        "Nulla porta iaculis neque, et vehicula libero iaculis et. In convallis nec neque quis adipiscing.",
      date: "1 day ago",
      image:
        "https://www.koranperdjoeangan.com/wp-content/uploads/2022/08/2019_0101_18132700-01-01.jpeg",
      author: "Canicula",
    },
    {
      title: "Most Popular Nature Photographers",
      category: "Photography",
      description:
        "Nulla porta iaculis neque, et vehicula libero iaculis et. In convallis nec neque quis adipiscing.",
      date: "1 day ago",
      image:
        "https://www.koranperdjoeangan.com/wp-content/uploads/2022/08/2019_0101_18132700-01-01.jpeg",
      author: "Canicula",
    },
    {
      title: "Most Popular Nature Photographers",
      category: "Photography",
      description:
        "Nulla porta iaculis neque, et vehicula libero iaculis et. In convallis nec neque quis adipiscing.",
      date: "1 day ago",
      image:
        "https://www.koranperdjoeangan.com/wp-content/uploads/2022/08/2019_0101_18132700-01-01.jpeg",
      author: "Canicula",
    },

    // Tambahkan lagi item jika perlu
  ];

  return (
    <section className="mt-12 px-4">
      <h2 className="text-2xl font-bold mb-6">🗞️ Berita Terbaru</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsData.map((news, index) => (
          <div
            key={index}
            className="rounded-xl shadow-md overflow-hidden bg-white hover:shadow-lg transition"
          >
            <div className="w-full aspect-[16/9]">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <span className="text-xs uppercase font-semibold text-blue-600">
                {news.category}
              </span>
              <h3 className="text-md font-bold mt-1">{news.title}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                {news.description}
              </p>
              <div className="mt-3 text-xs text-gray-400">
                <p>{news.date}</p>
                <p>Posted by {news.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}