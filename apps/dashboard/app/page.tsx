import { readSupabaseConfig, createPublicSupabaseClient } from '@shoppit/foundation';
export const dynamic = 'force-dynamic';
export default function Home() {
  const config = readSupabaseConfig(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
  const client = config ? createPublicSupabaseClient(config) : null;
  return <main><p className="eyebrow">SHOPPIT · FOUNDATION</p>
    <h1>The workspace for what comes next.</h1>
    <p>The merchant and admin dashboard is ready for the next approved build phase.</p>
    <section aria-labelledby="configuration"><h2 id="configuration">Project configuration</h2>
      <p>{client ? 'Supabase client configured. Run the connection check to verify connectivity.' : 'Supabase is not configured. Follow the setup guide to connect your project.'}</p>
    </section>
  </main>;
}
