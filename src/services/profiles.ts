import { supabase } from "../lib/supabase";

/**
 * Fetches the profile of a specific user by their ID.
 * The profile contains the user's display name and avatar.
 * Note: a profile is automatically created for every new user via a
 * database trigger — you never need to create one manually.
 * @param userId - the ID of the user whose profile you want to load
 */
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single(); // returns one object; gives an error if the profile doesn't exist

  return { data, error };
}

/**
 * Updates the profile of the currently logged-in user.
 * Only the owner of the profile can update it — this is enforced
 * by Row Level Security on the database.
 * @param userId - the ID of the user whose profile you want to update
 * @param updates - the fields you want to change (all optional):
 *   - full_name: the user's display name
 *   - avatar_url: the URL of their profile picture
 */
export async function updateProfile(
  userId: string,
  updates: { full_name?: string; avatar_url?: string }
) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  return { data, error };
}
