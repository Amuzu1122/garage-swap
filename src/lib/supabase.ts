import { createClient } from "@supabase/supabase-js";
import type { Database } from "../Types/database";

/**
 * This is the single Supabase client used across the entire app.
 * It connects to our Supabase project (database, auth, and storage) using
 * the URL and public API key stored in the .env file.
 *
 * The <Database> type parameter gives us full TypeScript autocompletion
 * for every table and column in our database.
 *
 * HOW TO SET IT UP:
 * 1. Go to your Supabase project → Settings → API
 * 2. Copy the "Project URL" and the "anon public" key
 * 3. Paste them into the .env file in the root of this project:
 *    VITE_SUPABASE_URL=your_project_url
 *    VITE_SUPABASE_ANON_KEY=your_anon_key
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Make sure both values are present before trying to connect.
// If either is missing, the whole app would fail silently — so we throw early with a clear message.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Could not connect to the database. The Supabase URL or API key is missing. " +
    "Please open the .env file in the root of this project and make sure both " +
    "VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are filled in correctly."
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
