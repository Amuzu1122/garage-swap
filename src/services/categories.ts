import { supabase } from "../lib/supabase";

/**
 * Fetches all available item categories from the database, sorted alphabetically.
 * Categories include things like Electronics, Furniture, Books, Sports, etc.
 * They are pre-seeded in the database and are used when a user creates a new listing
 * so they can label what kind of item they are posting.
 */
export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name"); // sorted A-Z so they appear in a logical order in dropdowns

  return { data, error };
}
