import { supabase } from "../lib/supabase";

/**
 * Fetch all categories.
 */
export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return { data, error };
}
