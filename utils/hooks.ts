import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useCurrentUserLoggedIn = () => {
  const [state, setState] = useState({
    user: null as User | null,
    loading: true,
    error: null as Error | null,
  });

  useEffect(() => {
    (async () => {
      setState(prev => ({ ...prev, loading: true }));
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        setState(prev => ({ ...prev, loading: false, error: error }));
        return;
      }
      setState(prev => ({ ...prev, user: data.user, loading: false, error: null }));
    })();
  }, []);
  return { user: state.user, loading: state.loading, error: state.error };
}