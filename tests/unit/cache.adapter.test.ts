import { describe, it, expect } from 'vitest';
import { CacheAdapter } from '../../src/infrastructure/cache/adapter';

describe('CacheAdapter', () => {
  it('stores, retrieves, and deletes values', async () => {
    const cache = new CacheAdapter();
    await cache.set('foo', 'bar');
    const fetched = await cache.get('foo');
    expect(fetched).toBe('bar');

    const deleted = await cache.delete('foo');
    expect(deleted).toBe(true);
    const missing = await cache.get('foo');
    expect(missing).toBeUndefined();
  });

  it('expires values after ttl', async () => {
    const cache = new CacheAdapter();
    await cache.set('temp', 'value', 50);
    const before = await cache.get('temp');
    expect(before).toBe('value');

    await new Promise((resolve) => setTimeout(resolve, 60));

    const after = await cache.get('temp');
    expect(after).toBeUndefined();
  });
});
