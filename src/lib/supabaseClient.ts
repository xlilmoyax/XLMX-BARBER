import { createClient } from '@supabase/supabase-js';
import { RegisteredUser } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Maps a Supabase row (snake_case) to a RegisteredUser (camelCase).
 */
export function mapRowToUser(row: any): RegisteredUser {
  return {
    id: row.id,
    fullname: row.fullname || '',
    age: row.age || 0,
    email: row.email || '',
    phone: row.phone || '',
    isSocio: row.is_socio ?? false,
    membership: row.membership || 'ninguno',
    createdAt: row.created_at || row.createdAt || new Date().toISOString(),
  };
}

/**
 * Maps a RegisteredUser (camelCase) to a Supabase-compatible row (snake_case).
 */
export function mapUserToRow(user: RegisteredUser) {
  return {
    id: user.id,
    fullname: user.fullname,
    age: user.age,
    email: user.email,
    phone: user.phone,
    is_socio: user.isSocio,
    membership: user.membership,
    created_at: user.createdAt,
  };
}