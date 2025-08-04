import { Queue } from 'bullmq';

const queue = new Queue('example');

async function run() {
  await queue.add('example-job', { message: 'hello from producer' });
  await queue.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
