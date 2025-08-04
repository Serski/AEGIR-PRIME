import { createClient, type RedisClientType, type RedisClientOptions } from 'redis';

export interface CacheClient {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  delete(key: string): Promise<number>;
}

export const CACHE_CLIENT = 'CacheClient';

/**
 * Redis backed cache adapter exposing a minimal async API for storing and
 * retrieving JSON serialisable values.
 */
export class CacheAdapter implements CacheClient {
  private client: RedisClientType<any, any, any>;

  constructor(options?: RedisClientOptions<any, any>) {
    this.client = createClient(options);
  }

  private async ensure(): Promise<void> {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  async connect(): Promise<void> {
    await this.ensure();
  }

  async disconnect(): Promise<void> {
    if (this.client.isOpen) {
      await this.client.disconnect();
    }
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.ensure();
    const payload = JSON.stringify(value);
    if (ttl) {
      await this.client.set(key, payload, { PX: ttl });
    } else {
      await this.client.set(key, payload);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    await this.ensure();
    const result = await this.client.get(key);
    return result ? (JSON.parse(result) as T) : null;
  }

  async delete(key: string): Promise<number> {
    await this.ensure();
    return this.client.del(key);
  }
}

export default CacheAdapter;
