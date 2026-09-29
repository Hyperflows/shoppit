import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readSupabaseConfig, createPublicSupabaseClient } from '../src/index';

test('unconfigured environment is explicit', () => assert.equal(readSupabaseConfig(), null));
test('partial configuration fails', () => assert.throws(() => readSupabaseConfig('http://localhost:54321')));
test('privileged keys cannot enter clients', () => {
  assert.throws(() => readSupabaseConfig('https://example.supabase.co', 'sb_secret_test'));
  const payload = btoa(JSON.stringify({ role: 'service_role' }));
  assert.throws(() => readSupabaseConfig('https://example.supabase.co', `header.${payload}.signature`));
});
test('valid public configuration creates a client without network access', () => {
  const config = readSupabaseConfig('http://localhost:54321', 'sb_publishable_test');
  assert.ok(config);
  assert.ok(createPublicSupabaseClient(config));
});
test('unsafe URL schemes and embedded credentials fail', () => {
  assert.throws(() => readSupabaseConfig('file:///tmp/db', 'sb_publishable_test'));
  assert.throws(() => readSupabaseConfig('https://user:pass@example.com', 'sb_publishable_test'));
});
