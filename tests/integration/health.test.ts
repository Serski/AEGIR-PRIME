import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import { createHealthServer } from '../../src/core/health';
import { AddressInfo } from 'net';

let server: ReturnType<typeof createHealthServer>;
let url: string;

beforeAll(() => {
  server = createHealthServer().listen(0);
  const { port } = server.address() as AddressInfo;
  url = `http://127.0.0.1:${port}`;
});

afterAll(() => {
  server.close();
});

describe('GET /healthz', () => {
  it('returns 200', async () => {
    const res = await fetch(`${url}/healthz`);
    expect(res.status).toBe(200);
  });
});
