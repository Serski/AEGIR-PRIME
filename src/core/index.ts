import { startHealthServer } from './health';

const { stop } = startHealthServer();

const shutdown = async (): Promise<void> => {
  await stop();
};

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);

export * from './worker';
export * from './container';
export * from './logger';
export * from './health';
