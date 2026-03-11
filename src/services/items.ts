import { supabase } from "../lib/supabase";

/**
 * Fetch all available items with joined profiles & categories.
 */
export async function getItems() {
  const { data, error } = await supabase
    .from("items")
    .select("*, profiles(*), categories(*)")
    .eq("status", "available")
    .order("created_at", { ascending: false });

  return { data, error };
}

/**
 * Fetch a single item by ID with joined profiles & categories.
 */
export async function getItemById(id: string) {
  const { data, error } = await supabase
    .from("items")
    .select("*, profiles(*), categories(*)")
    .eq("id", id)
    .single();

  return { data, error };
}

/**
 * Create a new item.
 */
export async function createItem(item: {
  title: string;
  description?: string;
  price: number;
  is_free: boolean;
  image_url?: string;
  owner_id: string;
  category_id?: string;
}) {
  const { data, error } = await supabase
    .from("items")
    .insert({
      ...item,
      status: "available",
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Update an item (owner only — enforced by RLS).
 */
export async function updateItem(
  id: string,
  updates: {
    title?: string;
    description?: string;
    price?: number;
    is_free?: boolean;
    image_url?: string;
    category_id?: string;
  }
) {
  const { data, error } = await supabase
    .from("items")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  return { data, error };
}

/**
 * Delete an item (owner only — enforced by RLS).
 */
export async function deleteItem(id: string) {
  const { error } = await supabase.from("items").delete().eq("id", id);

  return { error };
}

/**
 * Get items owned by the current user.
 */
export async function getMyItems(userId: string) {
  const { data, error } = await supabase
    .from("items")
    .select("*, profiles(*), categories(*)")
    .eq("owner_id", userId)
    .order("created_at", { ascending: false });

  return { data, error };
}

/**
 * Search items by title or description.
 */
export async function searchItems(query: string) {
  const { data, error } = await supabase
    .from("items")
    .select("*, profiles(*), categories(*)")
    .eq("status", "available")
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .order("created_at", { ascending: false });

  return { data, error };
}
