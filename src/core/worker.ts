import { EventEmitter } from 'events';
import type { Logger } from './logger';

export interface Job {
  id: string;
}

export class Worker extends EventEmitter {
  constructor(public logger: Logger) {
    super();
    this.on('completed', (job: Job) => this.logger.info('Job completed', job.id));
    this.on('failed', (job: Job, err: Error) =>
      this.logger.info('Job failed', job.id, err.message)
    );
  }

  process(job: Job): void {
    this.emit('completed', job);
  }

  fail(job: Job, err: Error): void {
    this.emit('failed', job, err);
  }
}
