import supabase from "@/api";

export type Database = typeof supabase;
export type AuthProvider = Database["auth"];
