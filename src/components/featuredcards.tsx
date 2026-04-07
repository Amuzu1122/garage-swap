// src/components/featuredcards.tsx
import { useEffect, useState } from "react";
import ItemCard from "./itemcards";
import sampleItems from "../items/items";
import { supabase } from "../lib/supabaseClient";
import type { Item } from "../Types/info";

export default function FeaturedCards() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      const { data, error } = await supabase
        .from("items")
        .select("*, profiles(*), categories(*)")
        .eq("status", "available")
        .order("created_at", { ascending: false })
        .limit(4);

      if (error || !data || data.length === 0) {
        setItems(sampleItems);
      } else {
        setItems(
          data.map((row) => ({
            ...row,
            badge: row.is_free ? "FREE" : "FIXED PRICE",
          })) as Item[]
        );
      }
      setLoading(false);
    }
    fetchFeatured();
  }, []);

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
          <button className="text-orange-500 font-semibold text-sm hover:underline cursor-pointer">
            View all →
          </button>
        </div>

        {/* Renders one ItemCard per item */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {loading ? (
            <p className="col-span-full text-center text-slate-400">Loading...</p>
          ) : (
            items.map((item) => <ItemCard key={item.id} item={item} />)
          )}
        </div>
      </div>
    </section>
  );
}
