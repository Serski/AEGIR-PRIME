import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import { AddressInfo } from 'net';
import type { Server } from 'http';

let server: Server;
let baseUrl: string;

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  process.env.PORT = '0';
  const { startServer } = await import('../../src/interfaces/rest/transport');
  server = startServer();
  await new Promise((resolve) => server.on('listening', resolve));
  const { port } = server.address() as AddressInfo;
  baseUrl = `http://127.0.0.1:${port}`;
});

afterAll(() => {
  server.close();
});

describe('REST server', () => {
  it('responds to /health', async () => {
    const res = await fetch(`${baseUrl}/health`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ status: 'ok' });
  });
});

