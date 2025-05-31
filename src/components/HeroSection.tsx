export default function HeroSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {/* Main Article */}
      <div className="md:col-span-2 relative rounded-xl overflow-hidden group">
        <div className="aspect-[16/9] w-full">
          <img
            src="https://www.koranperdjoeangan.com/wp-content/uploads/2022/08/2019_0101_18132700-01-01.jpeg"
            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
            alt="Main Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 md:p-6 flex items-end">
            <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight">
              Possible Architecture in Old Europe
            </h2>
          </div>
        </div>
      </div>

      {/* Side Articles */}
      <div className="grid gap-6">
        <div className="relative rounded-xl overflow-hidden group">
          <div className="aspect-[16/9] w-full">
            <img
              src="https://www.koranperdjoeangan.com/wp-content/uploads/2022/08/2019_0101_18132700-01-01.jpeg"
              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
              alt="Thumbnail 1"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 flex items-end">
              <h3 className="text-white text-sm sm:text-base font-semibold leading-snug">
                9 Awesome Destinations
              </h3>
            </div>
          </div>
        </div>

        <div className="relative rounded-xl overflow-hidden group">
          <div className="aspect-[16/9] w-full">
            <img
              src="https://www.koranperdjoeangan.com/wp-content/uploads/2022/08/2019_0101_18132700-01-01.jpeg"
              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
              alt="Thumbnail 2"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 flex items-end">
              <h3 className="text-white text-sm sm:text-base font-semibold leading-snug">
                The Top Secret Sights
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
