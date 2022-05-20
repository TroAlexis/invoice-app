import supabase from "@/api";
import { UserCredentials } from "@supabase/supabase-js";
import { AuthProvider } from "types/auth";

const signUp = (...args: Parameters<AuthProvider["signUp"]>) => {
  return supabase.auth.signUp(...args);
};

const logIn = (userCredentials: UserCredentials = {}) => {
  return supabase.auth.signIn(userCredentials);
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

const refreshSession = () => {
  return supabase.auth.refreshSession();
};

const onStateChange = (
  ...args: Parameters<AuthProvider["onAuthStateChange"]>
) => {
  return supabase.auth.onAuthStateChange(...args);
};

const authApi = {
  signUp,
  logIn,
  logOut,
  getUser,
  getSession,
  refreshSession,
  onStateChange,
};

export default authApi;
