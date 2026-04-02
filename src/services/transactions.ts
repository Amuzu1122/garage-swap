import { supabase } from "../lib/supabase";

/**
 * Called when a user wants to claim or buy an item.
 * This does two things in sequence:
 *   1. Creates a transaction record linking the item to the buyer.
 *   2. Updates the item's status to "claimed" so it no longer appears as available.
 *
 * If either step fails, it stops and returns the error so the caller can handle it.
 * Note: because these are two separate DB calls (not a transaction), in rare cases
 * the transaction could be created but the item status might not update —
 * a future improvement would be to handle this in a single database function.
 *
 * @param itemId  - the ID of the item being claimed
 * @param buyerId - the ID of the user who is claiming the item (must be logged in)
 */
export async function claimItem(itemId: string, buyerId: string) {
  // Step 1: Record the transaction (who bought what)
  const { data, error } = await supabase
    .from("transactions")
    .insert({ item_id: itemId, buyer_id: buyerId })
    .select()
    .single();

  // If creating the transaction failed, stop here and return the error
  if (error) return { data: null, error };

  // Step 2: Mark the item as "claimed" so it stops showing up in the listings
  const { error: updateError } = await supabase
    .from("items")
    .update({ status: "claimed" })
    .eq("id", itemId);

  // If updating the item status failed, return that error
  if (updateError) return { data: null, error: updateError };

  return { data, error: null };
}

/**
 * Fetches all items that the current user has claimed or bought.
 * Used on the user's dashboard/purchase history page.
 * Each transaction includes the full item details, the seller's profile,
 * and the item's category.
 *
 * @param buyerId - the ID of the logged-in user whose purchase history to load
 */
export async function getMyTransactions(buyerId: string) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*, items(*, profiles(*), categories(*))")
    .eq("buyer_id", buyerId)
    .order("created_at", { ascending: false }); // most recent purchases first

  return { data, error };
}
