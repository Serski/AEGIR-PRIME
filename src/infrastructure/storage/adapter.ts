import { promises as fs } from 'fs';
import path from 'path';

export interface StorageAdapterOptions {
  /**
   * Base directory where files will be stored. Defaults to
   * `<process.cwd()>/storage` when not provided.
   */
  root?: string;
  /**
   * Public URL used for generating file links. When not provided a `file://`
   * URL pointing to the local file is returned.
   */
  baseUrl?: string;
}

export interface StorageClient {
  save(filePath: string, content: Buffer | string): Promise<void>;
  read(filePath: string): Promise<Buffer>;
  update(filePath: string, content: Buffer | string): Promise<void>;
  delete(filePath: string): Promise<void>;
  exists(filePath: string): Promise<boolean>;
  generateUrl(filePath: string): string;
}

export const STORAGE_CLIENT = 'StorageClient';

/**
 * Simple storage adapter that persists files to the local filesystem. The
 * implementation is intentionally lightweight but exposes a small API that
 * mimics what a remote storage service (such as S3) would provide. This makes
 * it trivial to later swap the implementation for a different backend.
 */
export class StorageAdapter implements StorageClient {
  private root: string;
  private baseUrl: string | undefined;

  constructor(options: StorageAdapterOptions = {}) {
    this.root = options.root ?? path.resolve(process.cwd(), 'storage');
    this.baseUrl = options.baseUrl;
  }

  private resolve(filePath: string): string {
    return path.resolve(this.root, filePath);
  }

  /** Save a file to the configured storage location. */
  async save(filePath: string, content: Buffer | string): Promise<void> {
    const fullPath = this.resolve(filePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, content);
  }

  /** Retrieve a file's contents as a Buffer. */
  async read(filePath: string): Promise<Buffer> {
    const fullPath = this.resolve(filePath);
    return await fs.readFile(fullPath);
  }

  /** Update a file's contents. */
  async update(filePath: string, content: Buffer | string): Promise<void> {
    await this.save(filePath, content);
  }

  /** Remove a file from storage. */
  async delete(filePath: string): Promise<void> {
    const fullPath = this.resolve(filePath);
    await fs.unlink(fullPath);
  }

  /** Check whether a given file exists. */
  async exists(filePath: string): Promise<boolean> {
    const fullPath = this.resolve(filePath);
    try {
      await fs.access(fullPath);
      return true;
    } catch {
      return false;
    }
  }

  /** Generate a public URL for the given file. */
  generateUrl(filePath: string): string {
    if (this.baseUrl) {
      const base = this.baseUrl.replace(/\/+$/, '');
      const normalized = filePath.split(path.sep).join('/');
      return `${base}/${normalized}`;
    }

    return `file://${this.resolve(filePath)}`;
  }
}

export default StorageAdapter;
