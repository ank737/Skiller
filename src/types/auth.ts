import { Session, User } from "@supabase/supabase-js";

export interface AuthContextType {
  session: Session | null;

  user: User | null;

  profile: any | null;

  loading: boolean;

  initialized: boolean;

  error: string | null;

  refreshSession: () => Promise<void>;

  signOut: () => Promise<void>;

  clearError: () => void;
}