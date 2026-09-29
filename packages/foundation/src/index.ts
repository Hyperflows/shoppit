import { createClient } from '@supabase/supabase-js';

export type PublicSupabaseConfig = { url: string; publishableKey: string };

export function readSupabaseConfig(url?: string, publishableKey?: string): PublicSupabaseConfig | null {
  if (!url && !publishableKey) return null;
  if (!url || !publishableKey) throw new Error('Set both Supabase URL and publishable key.');
  const parsed = new URL(url);
  if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('Supabase URL must use HTTP or HTTPS.');
  if (parsed.username || parsed.password) throw new Error('Supabase URL must not contain credentials.');
  // Client configuration must never accept a privileged Supabase key.
  if (publishableKey.startsWith('sb_secret_')) throw new Error('Use a publishable key, never a secret key.');
  if (publishableKey.split('.').length === 3) {
    const payload = JSON.parse(atob(publishableKey.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))) as { role?: string };
    if (payload.role !== 'anon') throw new Error('Only legacy anon keys are allowed in client configuration.');
  } else if (!publishableKey.startsWith('sb_publishable_')) {
    throw new Error('Expected a Supabase publishable key or legacy anon key.');
  }
  return { url, publishableKey };
}

export function createPublicSupabaseClient(config: PublicSupabaseConfig) {
  return createClient(config.url, config.publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}
