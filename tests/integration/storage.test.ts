import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { promises as fs } from 'fs';
import path from 'path';
import { StorageAdapter } from '../../src/infrastructure/storage/adapter';

const ROOT = path.join(process.cwd(), 'tmp-storage');

describe('StorageAdapter', () => {
  let storage: StorageAdapter;

  beforeEach(async () => {
    await fs.rm(ROOT, { recursive: true, force: true });
    storage = new StorageAdapter({ root: ROOT, baseUrl: 'http://localhost/files' });
  });

  afterEach(async () => {
    await fs.rm(ROOT, { recursive: true, force: true });
  });

  it('performs basic CRUD operations and generates URLs', async () => {
    const filePath = 'example/hello.txt';
    const initial = 'hello world';
    await storage.save(filePath, initial);

    expect(await storage.exists(filePath)).toBe(true);

    const saved = await storage.read(filePath);
    expect(saved.toString()).toBe(initial);

    await storage.update(filePath, 'updated');
    const updated = await storage.read(filePath);
    expect(updated.toString()).toBe('updated');

    const url = storage.generateUrl(filePath);
    expect(url).toBe('http://localhost/files/example/hello.txt');

    await storage.delete(filePath);
    expect(await storage.exists(filePath)).toBe(false);
  });
});
