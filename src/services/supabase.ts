import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { ExamRecord, CollegeRecord, RealTimeUpdate, QuizAttempt } from '../types/index.ts';

const supabaseUrl =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) ||
  (typeof process !== 'undefined' && process.env?.SUPABASE_URL) ||
  'https://idhesegfliqgzhntdijw.supabase.co';

const supabaseAnonKey =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== 'undefined' && process.env?.SUPABASE_ANON_KEY) ||
  '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseAnonKey !== 'your-supabase-anon-public-key-here' &&
  supabaseAnonKey.length > 20
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

if (!isSupabaseConfigured) {
  console.info(
    'ExamSphere AI: Supabase is in resilient mode (demo & local cache active). To connect live database, provide VITE_SUPABASE_ANON_KEY.'
  );
}

// Helper: Query exams with graceful fallback
export async function getExamsFromDb(): Promise<ExamRecord[] | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from('exams').select('*');
    if (error || !data || data.length === 0) return null;
    return data as ExamRecord[];
  } catch {
    return null;
  }
}

// Helper: Query colleges with graceful fallback
export async function getCollegesFromDb(): Promise<CollegeRecord[] | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from('colleges').select('*');
    if (error || !data || data.length === 0) return null;
    return data as CollegeRecord[];
  } catch {
    return null;
  }
}

// Helper: Query updates with graceful fallback
export async function getUpdatesFromDb(): Promise<RealTimeUpdate[] | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from('real_time_updates').select('*');
    if (error || !data || data.length === 0) return null;
    return data as RealTimeUpdate[];
  } catch {
    return null;
  }
}

// Helper: Save quiz attempt
export async function saveQuizAttempt(attempt: Partial<QuizAttempt>): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from('quiz_attempts').insert([attempt]);
    return !error;
  } catch {
    return false;
  }
}
