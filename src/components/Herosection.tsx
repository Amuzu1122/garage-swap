export default function Hero() {
  return (
    <section className="bg-[#f5f2ec] pt-20 md:pt-25 px-6 sm:px-8 py-12 md:py-20">
      <div className="md:px-40 mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Text content */}
        <div className="flex-1 space-y-4 md:space-y-5 text-center md:text-left">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-orange-500 border border-orange-300 rounded-full px-3 py-1">
            Community First Marketplace
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-900 leading-tight">
            Your Neighborhood <br /> Garage Sale,{" "}
            <span className="text-orange-500">Online.</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-sm mx-auto md:mx-0">
            Sell, bid, or give away items you no longer need. Connect with
            neighbors and find hidden gems right next door.
          </p>
          <div className="flex gap-4 pt-2 justify-center md:justify-start">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 sm:px-7 py-3 rounded-lg transition-colors text-sm sm:text-base cursor-pointer">
              Start Selling
            </button>
            <button className="border-2 border-orange-300 text-gray-900 hover:bg-orange-400 hover:text-white font-bold px-5 sm:px-7 py-3 rounded-lg transition-colors text-sm sm:text-base cursor-pointer">
              Browse Items
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center w-full min-w-0 md:min-w-95">
          <img
            className="w-full max-w-sm md:max-w-none md:min-h-105 md:h-full rounded-md object-cover"
            src="/hero-img.jpg"
            alt="Neighbourhood garage sale items"
          />
        </div>
      </div>
    </section>
  );
}
