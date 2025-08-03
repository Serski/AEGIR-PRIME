import { afterEach, describe, expect, it, vi } from 'vitest';

describe('logger', () => {
  afterEach(() => {
    delete process.env.NODE_ENV;
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('uses pino-pretty in development', async () => {
    process.env.NODE_ENV = 'development';

    const pino = vi.fn(() => ({ info: vi.fn() }));
    vi.doMock('pino', () => ({ default: pino }));

    await import('../../src/core/logger');

    expect(pino).toHaveBeenCalledTimes(1);
    expect(pino).toHaveBeenCalledWith({
      transport: { target: 'pino-pretty' }
    });
  });

  it('does not use pino-pretty in production', async () => {
    process.env.NODE_ENV = 'production';

    const pino = vi.fn(() => ({ info: vi.fn() }));
    vi.doMock('pino', () => ({ default: pino }));

    await import('../../src/core/logger');

    expect(pino).toHaveBeenCalledTimes(1);
    expect(pino.mock.calls[0][0]).toBeUndefined();
  });
});

