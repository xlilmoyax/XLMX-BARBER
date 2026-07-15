import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://wqzhdtsnsryfmtkyqtkd.supabase.co";
const supabaseKey = "sb_publishable_q4zdKdBOavu9Yy1hgazjuw_snWYGHq0";

console.log("--- ¡EL CÓDIGO NUEVO ESTÁ FUNCIONANDO! ---");
console.log("URL:", supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseKey);