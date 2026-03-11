export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id?: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
      };
      items: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          price: number;
          is_free: boolean;
          image_url: string | null;
          status: "available" | "claimed";
          owner_id: string;
          category_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          price?: number;
          is_free?: boolean;
          image_url?: string | null;
          status?: "available" | "claimed";
          owner_id: string;
          category_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          price?: number;
          is_free?: boolean;
          image_url?: string | null;
          status?: "available" | "claimed";
          owner_id?: string;
          category_id?: string | null;
          created_at?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          item_id: string;
          buyer_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          item_id: string;
          buyer_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          item_id?: string;
          buyer_id?: string;
          created_at?: string;
        };
      };
    };
  };
};
