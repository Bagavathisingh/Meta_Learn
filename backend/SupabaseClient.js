import { createClient } from "@supabase/supabase-js";
import 'dotenv/config'
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABSE_ANON_KEY;

export const supabase = createClient(supabaseUrl,supabaseAnonKey);