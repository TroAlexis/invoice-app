import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { API_KEY, API_URL } from "constants/api";

const supabase: SupabaseClient = createClient(API_URL, API_KEY);

export default supabase;
