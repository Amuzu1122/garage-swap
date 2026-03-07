// src/components/featuredcards.tsx
import ItemCard from "./itemcards";
import items from "../items/items";

// Sample data — replace with fetch("/api/items/") when your Django API is ready
const featuredItems = items;

export default function FeaturedCards() {
  return (
    <section className="px-8 md:px-40 py-16">
      <div className="mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-5xl max-md:text-3xl font-black text-gray-900">
              Featured Finds
            </h2>
            <p className="text-gray-400 text-base max-md:text-sm mt-1">
              Handpicked items trending in your local area.
            </p>
          </div>
          <button className="text-orange-500 font-semibold text-sm hover:underline">
            View all →
          </button>
        </div>

        {/* Renders one ItemCard per item */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {featuredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
