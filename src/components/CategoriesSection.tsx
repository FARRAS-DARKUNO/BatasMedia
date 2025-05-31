export default function CategoriesSection() {
  const categories = ["Culture", "Adventure", "Beach", "Nature", "Food"];

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800">
        CATEGORIES
      </h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
        {categories.map((cat, i) => (
          <li
            key={i}
            className="group rounded-xl bg-gradient-to-tr from-blue-50 to-white shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-center justify-center px-4 py-3 text-gray-700 hover:text-teal-600 font-medium"
          >
            <span className="transition-transform group-hover:scale-105">
              {cat}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
