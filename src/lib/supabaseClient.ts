import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL //"https://shqqaoqtsatjoxfxkuus.supabase.co"
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY //sb_publishable_mfWdHbWjtY_wSyVTyQLxGw_hE2jK2l3

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase env variables cannot be found!. Check the .env file in the root directory and make sure the variables and values are correct")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)