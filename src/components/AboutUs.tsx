export default function AboutUs() {
  return (
    <section className="mt-10 bg-white shadow-md p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800">ABOUT US</h2>
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Gambar */}
        <div className="flex-shrink-0 w-full md:w-1/2">
          <img
            src="/images/about.jpg"
            alt="About Us"
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Teks */}
        <div className="text-gray-700 text-sm md:text-base leading-relaxed">
          <p>
            We are passionate travel bloggers dedicated to uncovering hidden gems and sharing unforgettable journeys from around the world. Whether it's breathtaking landscapes, vibrant cultures, or off-the-beaten-path adventures — we bring the world closer to you.
          </p>
          <p className="mt-4 text-teal-600 font-semibold">
            Join us as we explore, discover, and inspire!
          </p>
        </div>
      </div>
    </section>
  );
}
