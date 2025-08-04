import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import { createServer } from 'http';
import { AddressInfo } from 'net';
import { RestTransportAdapter } from '../../src/interfaces/rest/transport';

let server: ReturnType<typeof createServer>;
let baseUrl: string;

beforeAll(() => {
  server = createServer((req, res) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      res.setHeader('Content-Type', 'application/json');
      if (req.url === '/hello' && req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({ hello: 'world' }));
      } else if (req.url === '/echo' && req.method === 'POST') {
        const parsed = body ? JSON.parse(body) : {};
        res.writeHead(200);
        res.end(JSON.stringify({ received: parsed }));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'not found' }));
      }
    });
  }).listen(0);
  const { port } = server.address() as AddressInfo;
  baseUrl = `http://127.0.0.1:${port}`;
});

afterAll(() => {
  server.close();
});

describe('RestTransportAdapter', () => {
  it('handles GET requests', async () => {
    const client = new RestTransportAdapter(baseUrl);
    const res = await client.get<{ hello: string }>('/hello');
    expect(res).toEqual({ hello: 'world' });
  });

  it('handles POST requests with body', async () => {
    const client = new RestTransportAdapter(baseUrl);
    const payload = { foo: 'bar' };
    const res = await client.post<{ received: typeof payload }>('/echo', payload);
    expect(res).toEqual({ received: payload });
  });

  it('throws on HTTP errors', async () => {
    const client = new RestTransportAdapter(baseUrl);
    await expect(client.get('/missing')).rejects.toThrow(/404/);
  });
});
