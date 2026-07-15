import { createClient } from '@supabase/supabase-js';

// Valores fijos para asegurar que la aplicación cargue
const supabaseUrl = "https://wqzhdtsnsryfmtkyqtkd.supabase.co";
const supabaseKey = "sb_publishable_q4zdKdBOavu9Yy1hgazjuw_snWYGHq0";

console.log("Inicializando Supabase con:", supabaseUrl);

if (!supabaseUrl || !supabaseKey) {
  console.error("Faltan las credenciales de Supabase");
}

export const supabase = createClient(supabaseUrl, supabaseKey);