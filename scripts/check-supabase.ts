import { readSupabaseConfig } from '../packages/foundation/src/index';
try {
  const config = readSupabaseConfig(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY);
  if (!config) throw new Error('Set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY.');
  const response = await fetch(`${config.url.replace(/\/$/, '')}/rest/v1/`, {
    headers: { apikey: config.publishableKey }, signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Supabase REST connection failed (${response.status}).`);
  console.log('Supabase REST connection verified. No database writes performed.');
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Connection check failed.');
  process.exitCode = 1;
}
