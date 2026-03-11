import { supabase } from "../lib/supabase";

/**
 * Claim / buy an item — creates a transaction and marks item as "claimed".
 */
export async function claimItem(itemId: string, buyerId: string) {
  // Create the transaction
  const { data, error } = await supabase
    .from("transactions")
    .insert({ item_id: itemId, buyer_id: buyerId })
    .select()
    .single();

  if (error) return { data: null, error };

  // Mark item as claimed
  const { error: updateError } = await supabase
    .from("items")
    .update({ status: "claimed" })
    .eq("id", itemId);

  if (updateError) return { data: null, error: updateError };

  return { data, error: null };
}

/**
 * Get transactions for the current user (as buyer).
 */
export async function getMyTransactions(buyerId: string) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*, items(*, profiles(*), categories(*))")
    .eq("buyer_id", buyerId)
    .order("created_at", { ascending: false });

  return { data, error };
}
