import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { QueueAdapter } from '../../src/infrastructure/queue/adapter';
import RedisServer from 'redis-server';

let server: any;
const port = 6383;

beforeAll(async () => {
  server = new RedisServer(port);
  await server.open();
});

afterAll(async () => {
  await server.close();
});

describe('QueueAdapter', () => {
  it('enqueues, processes, and acknowledges jobs', async () => {
    const adapter = new QueueAdapter('test', {
      connection: { host: '127.0.0.1', port },
    });

    const processed: unknown[] = [];
    const worker = adapter.process(async (job) => {
      processed.push(job.data);
    });

    const completedPromise = new Promise((resolve) =>
      worker.once('completed', (job) => resolve(job))
    );

    await adapter.enqueue({ foo: 'bar' });

    const completedJob = (await completedPromise) as any;
    await adapter.acknowledge(completedJob);

    expect(processed).toEqual([{ foo: 'bar' }]);
    const fetched = await adapter.getJob(completedJob.id);
    expect(fetched).toBeUndefined();

    await adapter.close();
  });
});
