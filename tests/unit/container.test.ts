import { describe, it, expect } from 'vitest';
import { createContainer } from '../../src/core/container';
import { Worker } from '../../src/core/worker';
import { logger } from '../../src/core/logger';

describe('dependency container', () => {
  it('wires logger into worker', () => {
    const c = createContainer();
    const resolvedWorker = c.resolve(Worker);
    const resolvedLogger = c.resolve('logger');

    expect(resolvedWorker).toBeInstanceOf(Worker);
    expect(resolvedWorker.logger).toBe(resolvedLogger);
    expect(resolvedLogger).toBe(logger);
  });
});
