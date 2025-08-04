import 'reflect-metadata';
import { describe, it, beforeEach, afterEach, expect } from 'vitest';
import sqlite3 from 'sqlite3';
import { DatabaseAdapter } from '../../src/infrastructure/db/adapter';

class MockPrismaClient {
  private db = new sqlite3.Database(':memory:');

  async $connect() {}

  async $disconnect() {
    this.db.close();
  }

  $queryRawUnsafe<T = unknown>(sql: string, ...params: any[]): Promise<T> {
    return new Promise((resolve, reject) => {
      if (/^select/i.test(sql)) {
        this.db.all(sql, params, (err, rows) => {
          if (err) reject(err);
          else resolve(rows as T);
        });
      } else {
        this.db.run(sql, params, function (err) {
          if (err) reject(err);
          else resolve([] as unknown as T);
        });
      }
    });
  }

  async $transaction<T>(fn: (client: MockPrismaClient) => Promise<T>): Promise<T> {
    await this.$queryRawUnsafe('BEGIN');
    try {
      const result = await fn(this);
      await this.$queryRawUnsafe('COMMIT');
      return result;
    } catch (e) {
      await this.$queryRawUnsafe('ROLLBACK');
      throw e;
    }
  }
}

let db: DatabaseAdapter;
let client: MockPrismaClient;

describe('DatabaseAdapter', () => {
  beforeEach(async () => {
    client = new MockPrismaClient();
    db = new DatabaseAdapter(undefined, client as any);
    await db.initialize();
  });

  afterEach(async () => {
    await db.disconnect();
  });

  it('executes raw queries', async () => {
    await db.query('CREATE TABLE test (id INTEGER PRIMARY KEY, name TEXT)');
    await db.query('INSERT INTO test(name) VALUES (?)', ['Alice']);
    const rows = await db.query<{ id: number; name: string }[]>('SELECT * FROM test');
    expect(rows).toEqual([{ id: 1, name: 'Alice' }]);
  });

  it('supports transactions', async () => {
    await db.query('CREATE TABLE trans (id INTEGER PRIMARY KEY, name TEXT)');

    await db.transaction(async (tx) => {
      await tx.$queryRawUnsafe('INSERT INTO trans(name) VALUES (?)', 'Bob');
    });

    const rows = await db.query<{ name: string }[]>('SELECT name FROM trans');
    expect(rows).toEqual([{ name: 'Bob' }]);

    await expect(
      db.transaction(async (tx) => {
        await tx.$queryRawUnsafe('INSERT INTO trans(name) VALUES (?)', 'Carol');
        throw new Error('rollback');
      })
    ).rejects.toThrow();

    const rowsAfter = await db.query<{ name: string }[]>('SELECT name FROM trans');
    expect(rowsAfter).toEqual([{ name: 'Bob' }]);
  });
});

