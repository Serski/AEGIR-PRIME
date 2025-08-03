import { describe, it, expect, vi } from 'vitest';

vi.mock('bullmq', () => {
  class FakeWorker {
    async close() {}
  }
  return { Worker: FakeWorker };
});

import { createContainer } from '../../src/core/container';

describe('dependency container', () => {
  it('registers logger and worker', () => {
    const options = {
      queueName: 'test',
      connection: {},
      processor: vi.fn()
    };
    const container = createContainer(options);
    const created = container.resolve('worker');
    const logger = container.resolve('logger');
    expect(created.worker).toBeInstanceOf(Object);
    expect(typeof created.close).toBe('function');
    expect(logger).toHaveProperty('info');
  });
});
