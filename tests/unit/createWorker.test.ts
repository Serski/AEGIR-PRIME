import { describe, it, expect, vi } from 'vitest';

vi.mock('bullmq', () => {
  class FakeWorker {
    closed = false;
    async close() {
      this.closed = true;
    }
  }
  return { Worker: FakeWorker };
});

import { createWorker } from '../../src/core/worker';

describe('createWorker', () => {
  it('creates a worker with a close method', async () => {
    const processor = vi.fn();
    const { worker, close } = createWorker({
      queueName: 'test',
      connection: {},
      processor
    });

    expect(worker).toHaveProperty('closed', false);
    await close();
    expect(worker).toHaveProperty('closed', true);
  });
});
