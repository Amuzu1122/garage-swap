import { supabase } from "../lib/supabase";

/**
 * Uploads a photo for an item listing to Supabase Storage.
 * The file is saved in a folder named after the user, with the item ID as the filename.
 * This keeps files organised and makes it easy to find or delete them later.
 *
 * If the upload succeeds, it returns the public URL of the image so it can be
 * saved to the items table and displayed on the listing.
 *
 * The storage bucket is called "item-images" and must already exist in Supabase.
 * You can create it via: Supabase Dashboard → Storage → New Bucket → name: item-images, Public: ON
 *
 * @param userId - the ID of the logged-in user (used as the folder name)
 * @param itemId - the ID of the item this photo belongs to (used as the filename)
 * @param file   - the actual image file the user selected
 */
export async function uploadItemImage(
  userId: string,
  itemId: string,
  file: File
) {
  const fileExt = file.name.split(".").pop(); // get the file extension, e.g. "jpg"
  const filePath = `${userId}/${itemId}.${fileExt}`; // e.g. "user123/item456.jpg"

  const { error } = await supabase.storage
    .from("item-images")
    .upload(filePath, file, {
      upsert: true, // if an image for this item already exists, replace it instead of throwing an error
    });

  if (error) return { url: null, error };

  // Get the public URL of the uploaded image so it can be stored and shown in the UI
  const {
    data: { publicUrl },
  } = supabase.storage.from("item-images").getPublicUrl(filePath);

  return { url: publicUrl, error: null };
}

/**
 * Deletes the photo associated with an item from Supabase Storage.
 * Should be called whenever an item is deleted, to avoid leaving orphaned files.
 *
 * Because we don't store the file extension anywhere, this function lists
 * all files in the user's folder that match the item ID, then removes them.
 *
 * @param userId - the ID of the user who owns the item
 * @param itemId - the ID of the item whose image should be deleted
 */
export async function deleteItemImage(userId: string, itemId: string) {
  // List all files in the user's folder that match the item ID
  // (there should only be one, but this handles edge cases safely)
  const { data: files } = await supabase.storage
    .from("item-images")
    .list(userId, { search: itemId });

  if (files && files.length > 0) {
    const paths = files.map((f) => `${userId}/${f.name}`);
    await supabase.storage.from("item-images").remove(paths);
  }
}
