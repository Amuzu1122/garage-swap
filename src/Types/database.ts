/**
 * This file defines the TypeScript types that match our Supabase database schema exactly.
 * It is passed to the Supabase client (in lib/supabase.ts) so that every query we write
 * gets full autocompletion and type-checking for table names, column names, and value types.
 *
 * Each table has three sub-types:
 *  - Row:    the shape of a record when you READ it from the database
 *  - Insert: the shape of data you send when CREATING a new record (some fields are optional
 *            because the database sets them automatically, e.g. id, created_at)
 *  - Update: the shape of data you send when EDITING a record (all fields optional
 *            since you only need to send the fields you want to change)
 */
export type Database = {
  public: {
    Tables: {

      /**
       * profiles — stores public info about each user.
       * A row is automatically created here whenever a new user signs up,
       * via a database trigger that fires on the auth.users table.
       */
      profiles: {
        Row: {
          id: string;             // matches the user's auth ID from Supabase Auth
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;             // required — must match the auth user's ID
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;    // optional — database sets this automatically
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };

      /**
       * categories — a list of item categories (e.g. Electronics, Furniture, Books).
       * These are seeded by the schema and generally not changed by users.
       */
      categories: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id?: string;   // optional — database generates a UUID automatically
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
        Relationships: [];
      };

      /**
       * items — the core table. Each row is one listing posted by a user.
       * Status can be "available" (still listed) or "claimed" (someone bought/took it).
       */
      items: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          price: number;
          is_free: boolean;                    // if true, the item is being given away for free
          image_url: string | null;            // URL to the uploaded photo in Supabase Storage
          status: "available" | "claimed";     // claimed = no longer available
          owner_id: string;                    // the user ID of whoever listed this item
          category_id: string | null;          // links to the categories table
          created_at: string;
        };
        Insert: {
          id?: string;                         // optional — database generates a UUID automatically
          title: string;
          description?: string | null;
          price?: number;                      // optional — defaults to 0 in the database
          is_free?: boolean;                   // optional — defaults to false in the database
          image_url?: string | null;
          status?: "available" | "claimed";    // optional — defaults to "available" in the database
          owner_id: string;                    // required — must be set to the logged-in user's ID
          category_id?: string | null;
          created_at?: string;                 // optional — database sets this automatically
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
        Relationships: [
          {
            foreignKeyName: "items_owner_id_fkey";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "items_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };

      /**
       * transactions — records every time a user claims or buys an item.
       * Each item can only have one transaction (unique constraint on item_id).
       */
      transactions: {
        Row: {
          id: string;
          item_id: string;    // the item that was claimed
          buyer_id: string;   // the user who claimed/bought it
          created_at: string;
        };
        Insert: {
          id?: string;        // optional — database generates a UUID automatically
          item_id: string;
          buyer_id: string;
          created_at?: string; // optional — database sets this automatically
        };
        Update: {
          id?: string;
          item_id?: string;
          buyer_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "transactions_item_id_fkey";
            columns: ["item_id"];
            isOneToOne: true;
            referencedRelation: "items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transactions_buyer_id_fkey";
            columns: ["buyer_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };

    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
