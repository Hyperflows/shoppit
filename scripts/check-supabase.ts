import { readSupabaseConfig } from '../packages/foundation/src/index';
import { checkSupabaseConnection } from './supabase-connection';

try {
  const config = readSupabaseConfig(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY);
  if (!config) throw new Error('Set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY.');
  await checkSupabaseConnection(config);
  console.log('Supabase public client connection verified. No database writes performed.');
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Connection check failed.');
  process.exitCode = 1;
}
