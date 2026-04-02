// src/components/featuredcards.tsx

import { useEffect, useState } from "react";
import type { Item } from "../Types/info";
import type { Database } from "../Types/database";
import ItemCard from "./itemcards";
import { supabase } from "../lib/supabase";

import sampleItems from "../items/items";

type ItemRow = Database["public"]["Tables"]["items"]["Row"];

type FeaturedCardsProps = {
  searchResults?: Item[];
  searchQuery?: string;
};

export default function FeaturedCards({ searchResults, searchQuery }: FeaturedCardsProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If search results were passed in from the Navbar, use those directly
    // instead of fetching featured items from the database
    if (searchResults !== undefined) {
      setItems(searchResults);
      setLoading(false);
      return;
    }
  }, [searchResults]);

  useEffect(() => {
    // Only fetch featured items when we are NOT in search results mode
    if (searchResults !== undefined) return;
    async function fetchFeatured() {
      const { data, error } = await supabase
        .from("items")
        .select("*, profiles(*), categories(*)")
        .eq("status", "available")
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) {
        // Supabase returned an error — fall back to sample data so the page
        // still looks good, but also surface the error for debugging
        setError(error.message);
        setItems(sampleItems);
      } else if (data && data.length > 0) {
        // Real items from the database — map them to the Item type the UI expects
        setItems(
          data.map((row) => {
            const r = row as unknown as ItemRow;
            return { ...r, badge: r.is_free ? "FREE" : "FIXED PRICE" };
          }) as Item[]
        );
      } else {
        // Database connected fine but there are no listings yet — use sample data
        setItems(sampleItems);
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
              {searchQuery ? `Results for "${searchQuery}"` : "Featured Finds"}
            </h2>
            <p className="text-gray-400 text-base max-md:text-sm mt-1">
              {searchQuery
                ? `${items.length} item${items.length !== 1 ? "s" : ""} found`
                : "Handpicked items trending in your local area."}
            </p>
          </div>
          {!searchQuery && (
            <button className="text-orange-500 font-semibold text-sm hover:underline cursor-pointer">
              View all →
            </button>
          )}
        </div>

        {/* Show a notice if the database fetch failed (sample data is shown instead) */}
        {error && (
          <p className="text-xs text-red-400 mb-4">
            Could not load live listings ({error}). Showing sample items.
          </p>
        )}

        {/* Renders one ItemCard per item */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {loading ? (
            <p className="col-span-full text-center text-slate-400">Loading...</p>
          ) : items.length === 0 ? (
            <p className="col-span-full text-center text-slate-400 py-10">
              {searchQuery
                ? `No items found for "${searchQuery}". Try a different search.`
                : "No items available yet. Check back soon!"}
            </p>
          ) : (
            items.map((item) => <ItemCard key={item.id} item={item} />)
          )}
        </div>
      </div>
    </section>
  );
}
