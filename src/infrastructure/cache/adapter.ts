export interface CacheEntry<T = unknown> {
  value: T;
  expiresAt?: number;
}

/**
 * Lightweight in-memory cache adapter that mimics a Redis like API.  It
 * supports storing values with optional TTL (in milliseconds) and exposing
 * asynchronous methods for getting, setting and deleting entries.
 */
export class CacheAdapter {
  private readonly store = new Map<string, CacheEntry>();

  /**
   * Store a value by key with optional TTL in milliseconds.
   */
  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    const expiresAt = typeof ttl === 'number' ? Date.now() + ttl : undefined;
    this.store.set(key, { value, expiresAt });
  }

  /**
   * Retrieve a value by key if present and not expired.
   */
  async get<T>(key: string): Promise<T | undefined> {
    const entry = this.store.get(key);
    if (!entry) {
      return undefined;
    }

    if (entry.expiresAt && entry.expiresAt <= Date.now()) {
      this.store.delete(key);
      return undefined;
    }

    return entry.value as T;
  }

  /**
   * Delete a value from the cache.
   */
  async delete(key: string): Promise<boolean> {
    return this.store.delete(key);
  }
}

