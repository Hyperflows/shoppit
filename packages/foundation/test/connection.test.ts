import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkSupabaseConnection } from '../../../scripts/supabase-connection';

const config = { url: 'https://example.supabase.co/', publishableKey: 'sb_publishable_test' };

test('public connection uses the publishable key only in apikey, without a bearer token', async () => {
  await checkSupabaseConnection(config, async (url, options) => {
    assert.equal(url, 'https://example.supabase.co/auth/v1/settings');
    const headers = new Headers(options?.headers);
    assert.equal(headers.get('apikey'), config.publishableKey);
    assert.equal(headers.has('authorization'), false);
    assert.equal(options?.body, undefined);
    assert.equal(options?.redirect, 'error');
    assert.ok(options?.signal instanceof AbortSignal);
    return new Response('{}', { status: 200 });
  });
});

test('rejected key fails the connection check without exposing it', async () => {
  await assert.rejects(checkSupabaseConnection(config, async () => new Response('{}', { status: 401 })),
    { message: 'Supabase public client connection failed (401).' });
});

test('network failures fail the connection check', async () => {
  await assert.rejects(checkSupabaseConnection(config, async () => { throw new Error('fetch failed'); }),
    { message: 'fetch failed' });
});
