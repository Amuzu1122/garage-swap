import { supabase } from "../lib/supabase";

/**
 * Fetches all items that are currently available (not yet claimed).
 * Each item includes the seller's profile info and its category.
 * Results are sorted from newest to oldest.
 * Used on the home page to show the browse/featured listings.
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
 * Fetches a single item by its unique ID.
 * Also includes the seller's profile and the item's category.
 * Used when a user clicks on a specific listing to view its details.
 * @param id - the unique ID of the item to fetch
 */
export async function getItemById(id: string) {
  const { data, error } = await supabase
    .from("items")
    .select("*, profiles(*), categories(*)")
    .eq("id", id)
    .single(); // returns one object instead of an array; errors if not found

  return { data, error };
}

/**
 * Creates a new listing in the database.
 * The item is automatically marked as "available" when created.
 * Only authenticated users can call this (enforced by Row Level Security on the DB).
 * @param item - the details of the item being listed
 */
export async function createItem(item: {
  title: string;
  description?: string;
  price: number;
  is_free: boolean;
  image_url?: string;
  owner_id: string;   // must match the logged-in user's ID
  category_id?: string;
}) {
  const { data, error } = await supabase
    .from("items")
    .insert({
      ...item,
      status: "available", // all new listings start as available
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Updates an existing item's details.
 * Only the owner of the item can do this — the database enforces this
 * through Row Level Security (RLS), so other users' attempts will be rejected.
 * @param id - the ID of the item to update
 * @param updates - only the fields you want to change (all are optional)
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
 * Permanently deletes an item from the database.
 * Only the owner of the item can do this — enforced by Row Level Security.
 * Note: if the item has an uploaded image, you should also call
 * deleteItemImage() from storage.ts to clean up the file.
 * @param id - the ID of the item to delete
 */
export async function deleteItem(id: string) {
  const { error } = await supabase.from("items").delete().eq("id", id);

  return { error };
}

/**
 * Fetches all items listed by a specific user.
 * Used on a user's profile/dashboard page to show their own listings.
 * Includes both available and claimed items so the user can see their full history.
 * @param userId - the ID of the user whose items we want to fetch
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
 * Searches for available items where the title or description
 * contains the given search term (case-insensitive).
 * Used for the search bar functionality.
 * @param query - the text the user typed into the search bar
 */
export async function searchItems(query: string) {
  const { data, error } = await supabase
    .from("items")
    .select("*, profiles(*), categories(*)")
    .eq("status", "available")
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`) // ilike = case-insensitive match
    .order("created_at", { ascending: false });

  return { data, error };
}
