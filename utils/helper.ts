import { createClient } from "@/lib/supabase/server";

export const isLoggedIn = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  return !!data?.claims;
}
