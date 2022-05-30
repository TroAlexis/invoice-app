import supabase from "@/api";
import { UserCredentials } from "@supabase/supabase-js";
import { genConfig } from "react-nice-avatar";
import { AuthProvider } from "types/auth";

const authApi = {
  signUp: (...args: Parameters<AuthProvider["signUp"]>) => {
    return supabase.auth.signUp(...args);
  },

  logIn: (userCredentials: UserCredentials = {}) => {
    return supabase.auth.signIn(userCredentials);
  },

  logOut: () => {
    return supabase.auth.signOut();
  },

  update: (...args: Parameters<AuthProvider["update"]>) => {
    return supabase.auth.update(...args);
  },

  setUserAvatar() {
    return authApi.update({
      data: {
        avatar: genConfig({
          sex: "man",
          hairColorRandom: true,
          isGradient: true,
        }),
      },
    });
  },

  getUser: () => {
    return supabase.auth.user();
  },

  getSession: () => {
    return supabase.auth.session();
  },

  refreshSession: () => {
    return supabase.auth.refreshSession();
  },

  onStateChange: (...args: Parameters<AuthProvider["onAuthStateChange"]>) => {
    return supabase.auth.onAuthStateChange(...args);
  },
} as const;

export default authApi;
