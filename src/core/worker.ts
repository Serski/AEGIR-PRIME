import type { Processor, WorkerOptions } from 'bullmq';
import { Worker } from 'bullmq';

export interface CreateWorkerOptions {
  queueName: string;
  connection: WorkerOptions['connection'];
  processor: Processor;
}

export interface CreatedWorker {
  worker: Worker;
  close(): Promise<void>;
}

export function createWorker({
  queueName,
  connection,
  processor
}: CreateWorkerOptions): CreatedWorker {
  const worker = new Worker(queueName, processor, { connection });

  return {
    worker,
    close: async (): Promise<void> => {
      await worker.close();
    }
  };
}

