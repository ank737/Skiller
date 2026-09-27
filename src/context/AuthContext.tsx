import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

import { AuthContextType } from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [initialized, setInitialized] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const refreshSession = async () => {
    try {
      setLoading(true);

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;
      setSession(session);
      setUser(session?.user ?? null);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      setSession(null);
      setUser(null);
      setProfile(null);

      setError(null);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    const loadProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error(error);
    setProfile(null);
    return;
  }

  setProfile(data);
};
    refreshSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async(_event, session) => {
        setSession(session);
setUser(session?.user ?? null);

if (session?.user) {
  loadProfile(session.user.id);
} else {
  setProfile(null);
}

if (session?.user) {
   loadProfile(session.user.id);
} else {
  setProfile(null);
}
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        loading,
        initialized,
        error,
        refreshSession,
        signOut,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };