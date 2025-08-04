import type { QueueOptions, JobsOptions, Job, WorkerOptions } from 'bullmq';
import { Queue, Worker } from 'bullmq';

export interface QueueClient {
  enqueue<T = unknown>(data: T, name?: string, opts?: JobsOptions): Promise<Job<T>>;
  process<T = unknown>(handler: (job: Job<T>) => Promise<unknown>, opts?: WorkerOptions): Worker;
  acknowledge(job: Job): Promise<void>;
  getJob(id: string): Promise<Job | null>;
  close(): Promise<void>;
}

export const QUEUE_CLIENT = 'QueueClient';

/**
 * Simple wrapper around BullMQ that exposes helpers for adding and
 * processing jobs.  The adapter is purposely small – it only implements the
 * bits of functionality that are exercised in the unit tests.
 */
export class QueueAdapter implements QueueClient {
  private readonly queue: Queue;
  private worker?: Worker;

  constructor(name: string, options?: QueueOptions) {
    this.queue = new Queue(name, options);
  }

  /**
   * Enqueue a new job into the underlying queue.
   */
  enqueue<T = unknown>(data: T, name = 'job', opts?: JobsOptions) {
    return this.queue.add(name, data as any, opts);
  }

  /**
   * Register a processor that will handle jobs for this queue.
   * Returns the created worker so callers may listen to events.
   */
  process<T = unknown>(handler: (job: Job<T>) => Promise<unknown>, opts?: WorkerOptions) {
    this.worker = new Worker<T>(this.queue.name, handler, {
      connection: this.queue.opts.connection,
      ...opts,
    });

    return this.worker;
  }

  /**
   * Acknowledge a processed job by removing it from the queue.
   */
  async acknowledge(job: Job): Promise<void> {
    await job.remove();
  }

  /**
   * Helper used in tests to look up a job in the queue.
   */
  getJob(id: string) {
    return this.queue.getJob(id);
  }

  /**
   * Close the underlying queue and worker.
   */
  async close(): Promise<void> {
    await this.worker?.close();
    await this.queue.close();
  }
}

