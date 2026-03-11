export type Category = {
  id: string | number;
  name: string;
};

export type Owner = {
  id: string | number;
  username: string;
};

export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type Item = {
  id: string | number;
  title: string;
  description?: string | null;
  price: number;
  is_free: boolean;
  image?: string;
  image_url?: string | null;
  status: "available" | "claimed";
  badge: "FIXED PRICE" | "BIDDING" | "FREE";
  owner_id?: string;
  category_id?: string | null;
  created_at?: string;
  // Supabase joined relations
  profiles?: Profile;
  categories?: Category;
  // Legacy/sample-data aliases
  category?: Category;
  owner?: Owner;
};

export type Transaction = {
  id: string;
  item_id: string;
  buyer_id: string;
  created_at: string;
  items?: Item;
  profiles?: Profile;
};

// No emoji field
export type Step = {
  num: number;
  title: string;
  desc: string;
};