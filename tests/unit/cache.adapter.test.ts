import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { CacheAdapter } from '../../src/infrastructure/cache/adapter';
import RedisServer from 'redis-server';

let server: any;
const port = 6382;

beforeAll(async () => {
  server = new RedisServer(port);
  await server.open();
});

afterAll(async () => {
  await server.close();
});

describe('CacheAdapter', () => {
  it('stores, retrieves, and deletes values', async () => {
    const cache = new CacheAdapter({ url: `redis://127.0.0.1:${port}` });
    await cache.connect();
    await cache.set('foo', 'bar');
    const fetched = await cache.get('foo');
    expect(fetched).toBe('bar');

    const deleted = await cache.delete('foo');
    expect(deleted).toBe(1);
    const missing = await cache.get('foo');
    expect(missing).toBeNull();
    await cache.disconnect();
  });

  it('expires values after ttl', async () => {
    const cache = new CacheAdapter({ url: `redis://127.0.0.1:${port}` });
    await cache.connect();
    await cache.set('temp', 'value', 50);
    const before = await cache.get('temp');
    expect(before).toBe('value');

    await new Promise((resolve) => setTimeout(resolve, 60));

    const after = await cache.get('temp');
    expect(after).toBeNull();
    await cache.disconnect();
  });
});
