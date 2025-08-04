import { Worker } from 'bullmq';

const worker = new Worker('example', async job => {
  console.log('processing job', job.name, job.data);
});

worker.on('completed', job => {
  console.log(`job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`job ${job?.id} failed:`, err);
});
