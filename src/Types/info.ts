export type Category = {
  id: number;
  name: string;
};

export type Owner = {
  id: number;
  username: string;
};

export type Item = {
  id: number;
  title: string;
  price: number;
  description?: string;
  image?: string;
  is_free: boolean;
  status: "available" | "claimed";
  badge: "FIXED PRICE" | "BIDDING" | "FREE";
  category: Category;
  owner: Owner;
};

// No emoji field
export type Step = {
  num: number;
  title: string;
  desc: string;
};