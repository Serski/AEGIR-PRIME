import { Job, Worker } from 'bullmq';
import { redisConfig } from '../config/redis';
import { logger } from './logger';

export function createWorker(): Worker {
  const worker = new Worker(
    'jobs',
    async (job: Job) => {
      logger.info({ jobId: job.id, name: job.name }, 'processing job');
    },
    { connection: redisConfig }
  );

  worker.on('completed', (job) => {
    logger.info({ jobId: job.id }, 'job completed');
  });

  worker.on('failed', (job, err) => {
    logger.error({ jobId: job?.id, err }, 'job failed');
  });

  return worker;
}
