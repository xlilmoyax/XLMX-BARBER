import { createClient } from '@supabase/supabase-js';

// src/lib/supabaseClient.ts

// CAMBIA ESTO SOLO PARA PROBAR:
const supabaseUrl = "https://wqzhdtsnsryfmtkyqtkd.supabase.co/rest/v1/";
const supabaseKey = "sb_publishable_q4zdKdBOavu9Yy1hgazjuw_snWYGHq0";

export const supabase = createClient(supabaseUrl, supabaseKey);

if (!import.meta.env.VITE_SUPABASE_URL) {
  throw new Error("ERROR CRÍTICO: La variable VITE_SUPABASE_URL no está llegando al build.");
}