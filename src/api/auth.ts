import supabase from "@/api";
import { UserCredentials } from "@supabase/supabase-js";

const logIn = ({
  provider = "github",
  ...credentials
}: UserCredentials = {}) => {
  return supabase.auth.signIn({
    provider,
    ...credentials,
  });
};

const logOut = () => {
  return supabase.auth.signOut();
};

const getUser = () => {
  return supabase.auth.user();
};

const getSession = () => {
  return supabase.auth.session();
};

const onStateChange = (
  ...args: Parameters<typeof supabase.auth.onAuthStateChange>
) => {
  return supabase.auth.onAuthStateChange(...args);
};

const authApi = {
  logIn,
  logOut,
  getUser,
  getSession,
  onStateChange,
};

export default authApi;
