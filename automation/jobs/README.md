# Automation Jobs

Examples demonstrating BullMQ job producers and consumers.

## Prerequisites

- Node.js dependencies installed (`npm install`)
- A running Redis server. Start one with `npx redis-server` or `docker run -p 6379:6379 redis`.

## Running the Example

Start a worker to process jobs:

```bash
npx ts-node automation/jobs/consumer.ts
```

In another terminal, enqueue a job:

```bash
npx ts-node automation/jobs/producer.ts
```

The worker logs job details when it processes a task.
