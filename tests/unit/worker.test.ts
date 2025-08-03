import { describe, it, expect, vi } from 'vitest';
import { Worker } from '../../src/core/worker';

describe('worker event handlers', () => {
  it('logs on completed and failed events', () => {
    const logger = { info: vi.fn() };
    const worker = new Worker(logger);
    const job = { id: '1' };

    worker.process(job);
    expect(logger.info).toHaveBeenCalledWith('Job completed', job.id);

    const error = new Error('oops');
    worker.fail(job, error);
    expect(logger.info).toHaveBeenCalledWith('Job failed', job.id, error.message);
  });
});
