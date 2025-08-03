import 'reflect-metadata';
import { describe, it, beforeEach, afterEach, expect } from 'vitest';
import { DatabaseAdapter } from '../../src/infrastructure/db/adapter';
import type { DataSourceOptions } from 'typeorm';

let db: DatabaseAdapter;
let options: DataSourceOptions;

describe('DatabaseAdapter', () => {
  beforeEach(async () => {
    options = {
      type: 'sqlite',
      database: ':memory:',
    } as DataSourceOptions;
    db = new DatabaseAdapter(options);
    await db.initialize();
  });

  afterEach(async () => {
    await db.destroy();
  });

  it('executes raw queries', async () => {
    await db.query('CREATE TABLE test (id INTEGER PRIMARY KEY, name TEXT)');
    await db.query('INSERT INTO test(name) VALUES (?)', ['Alice']);
    const rows = await db.query<{ id: number; name: string }[]>('SELECT * FROM test');
    expect(rows).toEqual([{ id: 1, name: 'Alice' }]);
  });

  it('supports transactions', async () => {
    await db.query('CREATE TABLE trans (id INTEGER PRIMARY KEY, name TEXT)');

    await db.transaction(async (manager) => {
      await manager.query('INSERT INTO trans(name) VALUES (?)', ['Bob']);
    });

    const rows = await db.query<{ name: string }[]>('SELECT name FROM trans');
    expect(rows).toEqual([{ name: 'Bob' }]);

    await expect(
      db.transaction(async (manager) => {
        await manager.query('INSERT INTO trans(name) VALUES (?)', ['Carol']);
        throw new Error('rollback');
      })
    ).rejects.toThrow();

    const rowsAfter = await db.query<{ name: string }[]>('SELECT name FROM trans');
    expect(rowsAfter).toEqual([{ name: 'Bob' }]);
  });
});

