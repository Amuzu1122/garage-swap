import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

/**
 * Describes everything the AuthContext provides to the rest of the app.
 * - session: the full Supabase session object (contains tokens etc.)
 * - user: the logged-in user object, or null if nobody is logged in
 * - loading: true while we are still checking if a session exists on first load
 * - signUp: creates a new account with email, password, and an optional display name
 * - signIn: logs an existing user in with their email and password
 * - signOut: logs the current user out
 */
type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
};

// Create the context with no default value — components must be wrapped in AuthProvider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider wraps the whole app and keeps track of who is logged in.
 * It also exposes signUp, signIn, and signOut so any component can use them
 * without having to talk to Supabase directly.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // loading starts as true so the app waits before deciding if the user is logged in or not
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On first load, check if there is already an active session saved in the browser
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false); // done checking, app can now render
    });

    // Keep listening for any auth changes (login, logout, token refresh)
    // so the UI stays in sync automatically
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    // Clean up the listener when this component unmounts
    return () => subscription.unsubscribe();
  }, []);

  /**
   * Creates a new user account.
   * @param email - the user's email address
   * @param password - the user's chosen password
   * @param fullName - optional display name; passed as metadata so the database
   *                   trigger can save it to the profiles table automatically on signup
   */
  const signUp = async (email: string, password: string, fullName?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // The database has a trigger that fires when a new user is created.
        // It reads 'full_name' from this metadata and saves it to the profiles table.
        // Without this, the user's name would be lost and their profile would be blank.
        data: { full_name: fullName ?? "" },
      },
    });
    return { error: error as Error | null };
  };

  /**
   * Logs an existing user in with their email and password.
   * @param email - the user's email address
   * @param password - the user's password
   */
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error as Error | null };
  };

  /**
   * Logs the current user out and clears their session from the browser.
   */
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{ session, user, loading, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth is a custom hook that gives any component access to the auth context.
 * It must be used inside a component that is wrapped by <AuthProvider>.
 * If it's used outside of that, it will throw a clear error to help with debugging.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuth was called outside of AuthProvider. Make sure your component is wrapped inside <AuthProvider> in main.tsx."
    );
  }
  return context;
}
