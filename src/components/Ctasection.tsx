export default function Ctasection() {
  return (
    <section className="bg-white px-8 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#1e1e1a] rounded-3xl px-10 py-16 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            Ready to clear some space <br /> in your garage?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
            Join thousands of neighbors already buying and selling on GarageSwap. It's fast, free, and fun.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-lg text-lg transition-colors cursor-pointer">
            Start Selling Now
          </button>
        </div>
      </div>
    </section>
  );
}