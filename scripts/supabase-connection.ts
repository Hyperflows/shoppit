import type { PublicSupabaseConfig } from '../packages/foundation/src/index';

// Public settings require an accepted API key, without any user session or database schema.
export async function checkSupabaseConnection(config: PublicSupabaseConfig, request: typeof fetch = fetch): Promise<void> {
  const response = await request(`${config.url.replace(/\/$/, '')}/auth/v1/settings`, {
    headers: { apikey: config.publishableKey },
    signal: AbortSignal.timeout(10000),
    redirect: 'error',
  });
  if (!response.ok) throw new Error(`Supabase public client connection failed (${response.status}).`);
}
