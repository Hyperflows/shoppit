# Shoppit foundation

Phase 0 only: Expo consumer app, Next.js merchant/admin shell, Supabase client configuration, and CI. No authentication flows, roles, feed, commerce, tracking, or billing are implemented.

## Requirements and commands

Install Node.js 22 LTS (22.13 or newer), pnpm 11.25.0, then run `pnpm install --frozen-lockfile`.

- `pnpm dev:mobile`: Expo development server; scan with compatible Expo Go on a device, or press i/a for an installed simulator/emulator.
- `pnpm dev:dashboard`: dashboard at http://localhost:3000.
- `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`: the same checks run in CI.
- `pnpm build` creates a Next.js production build and Expo JavaScript bundles for iOS/Android. It does not compile native binaries or prove device execution.

For iOS simulator testing install Xcode and its command line tools. For Android install Android Studio, an emulator and Android SDK. Native store identifiers and signing credentials are intentionally unset until supplied by the owner.

## Supabase and environment setup

Copy each app's `.env.example` to `.env.local` and fill in its URL and **publishable** key from your Supabase project. Expo reads `EXPO_PUBLIC_*`; Next.js reads `NEXT_PUBLIC_*`. These values are public and become visible in app bundles. A legacy `anon` key also works. Never put a service-role key, `sb_secret_*`, database password, or other credential in public variables. Missing configuration shows a setup message; partial/invalid configuration fails explicitly. Configuration status does not claim connectivity.

Choose one backend:

1. Local: install Docker and the Supabase CLI, then run `supabase start` from this repository. Use the URL and anon/publishable key from `supabase status`. On an Android emulator use `http://10.0.2.2:54321`; on a physical device use your computer's LAN address with Docker ports reachable. An iOS simulator can use `http://127.0.0.1:54321`.
2. Remote: create your own Supabase project and copy its project URL and publishable key. No project IDs or credentials are committed. To manage remote migrations later, use `supabase login` and `supabase link --project-ref YOUR_PROJECT_REF` locally.

Verify a real connection with `SUPABASE_URL=... SUPABASE_PUBLISHABLE_KEY=... pnpm check:supabase`. Alternatively copy root `.env.example` to `.env`, fill it in, and run `node --env-file=.env --import tsx scripts/check-supabase.ts`. The check calls the REST API without writing data. Do not paste secrets into logs or version control.

No database schema is needed for Phase 0, so no migration or seed is added. Future database changes must be committed under `supabase/migrations/`. Client configuration alone provides no authorization; later phases must enforce permissions through Postgres RLS and server-side checks before exposing data. Session persistence is disabled until Phase 1 defines auth behavior.

Mux, Shopify, and Stripe need no credentials or dependencies in Phase 0. Future server secrets must use deployment secret storage and server-only environment variables, never Expo/Next public variables. Use separate projects and environment values for local, staging, and production; CI builds the unconfigured shell without secrets.

## Architecture decisions

pnpm workspaces provide one lockfile without a monorepo orchestration dependency. `apps/mobile` uses Expo's built-in monorepo support; `apps/dashboard` uses the Next.js App Router. `packages/foundation` shares public configuration validation and Supabase client creation. Node's test runner plus tsx covers configuration boundaries without an additional test framework. Hoisted dependency linking keeps Metro resolution simple. UI shells use system fonts and platform primitives without a component library. A URL polyfill supplies the complete URL API required by Supabase on React Native. Dashboard typechecking generates Next.js route types first so it works on a fresh checkout.

## Phase 0 acceptance

CI checks compilation and native JavaScript exports. Before calling all Phase 0 acceptance items verified, run both apps, verify the dashboard at iPhone (390×844) and Android (412×915) widths, launch Expo on iOS and Android simulator/device, and verify a live Supabase connection. These external checks need the relevant tools and a project. Continue to Phase 1 only with explicit approval.

## Verification performed (2026-09-30)

- Passed: frozen-lockfile installation, `pnpm peers check`, `pnpm lint`, `pnpm typecheck`, `pnpm test` (5 tests), `pnpm build`, and `pnpm --filter @shoppit/mobile exec expo install --check`.
- Next.js production server started and rendered the dashboard. Browser checks at 390×844 and 412×915 confirmed readable content and no horizontal overflow.
- Expo offline development server started on port 8081; iOS and Android Hermes bundles exported successfully.
- `pnpm check:supabase` correctly failed with the missing environment configuration message. A live backend connection has not been verified.
- Native iOS/Android execution and native layouts remain unverified: Xcode/simulator, Android SDK/emulator, Docker and Supabase CLI were unavailable. No remote project configuration was supplied.
- GitHub Actions is configured but has not run on GitHub yet. Four transitive dependency deprecation warnings remain in the framework dependency tree; direct peer checks pass.

Reference documentation: [Expo monorepos](https://docs.expo.dev/guides/monorepos/), [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), and [Supabase with Expo](https://supabase.com/docs/guides/getting-started/quickstarts/expo-react-native).
