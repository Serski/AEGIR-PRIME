import { PrismaClient } from '@prisma/client';

export interface DatabaseClient {
  initialize(): Promise<void>;
  query<T = unknown>(sql: string, params?: unknown[]): Promise<T>;
  transaction<T>(fn: (prisma: PrismaClient) => Promise<T>): Promise<T>;
  disconnect(): Promise<void>;
  readonly client: PrismaClient;
}

export const DATABASE_CLIENT = 'DatabaseClient';

/**
 * Wrapper around PrismaClient providing basic helpers for raw queries and
 * transactional execution. The client is lazily connected on first use.
 */
export class DatabaseAdapter implements DatabaseClient {
  public readonly client: PrismaClient;
  private initialized = false;

  constructor(options?: ConstructorParameters<typeof PrismaClient>[0], client?: PrismaClient) {
    this.client = client ?? new PrismaClient(options);
  }

  /** Connect to the database if not already connected. */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }
    await this.client.$connect();
    this.initialized = true;
  }

  /** Execute a raw SQL query using Prisma's unsafe interface. */
  async query<T = unknown>(sql: string, params: unknown[] = []): Promise<T> {
    await this.initialize();
    return (await this.client.$queryRawUnsafe(sql, ...params)) as unknown as T;
  }

  /** Run the provided callback inside a transaction. */
  async transaction<T>(fn: (prisma: PrismaClient) => Promise<T>): Promise<T> {
    await this.initialize();
    return this.client.$transaction(fn);
  }

  /** Disconnect the underlying Prisma client. */
  async disconnect(): Promise<void> {
    if (!this.initialized) {
      return;
    }
    await this.client.$disconnect();
    this.initialized = false;
  }
}

export default DatabaseAdapter;
