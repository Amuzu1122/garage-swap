import { supabase } from "../lib/supabase";

/**
 * Upload an item image to Supabase Storage.
 * Returns the public URL of the uploaded image.
 */
export async function uploadItemImage(
  userId: string,
  itemId: string,
  file: File
) {
  const fileExt = file.name.split(".").pop();
  const filePath = `${userId}/${itemId}.${fileExt}`;

  const { error } = await supabase.storage
    .from("item-images")
    .upload(filePath, file, { upsert: true });

  if (error) return { url: null, error };

  const {
    data: { publicUrl },
  } = supabase.storage.from("item-images").getPublicUrl(filePath);

  return { url: publicUrl, error: null };
}

/**
 * Delete an item image from Supabase Storage.
 */
export async function deleteItemImage(userId: string, itemId: string) {
  // We don't know the exact extension, so list and delete
  const { data: files } = await supabase.storage
    .from("item-images")
    .list(userId, { search: itemId });

  if (files && files.length > 0) {
    const paths = files.map((f) => `${userId}/${f.name}`);
    await supabase.storage.from("item-images").remove(paths);
  }
}
