import supabase from "@/api";
import { UserCredentials } from "@supabase/supabase-js";

export const logIn = ({
  provider = "github",
  ...credentials
}: UserCredentials) => {
  return supabase.auth.signIn({
    provider,
    ...credentials,
  });
};
