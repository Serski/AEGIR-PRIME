const tsnode = require('ts-node');
tsnode.register({ transpileOnly: true, swc: false });

const { describe, it } = require('node:test');
const assert = require('node:assert');

class FakeWorker {
  constructor() {
    this.closed = false;
  }

  async close() {
    this.closed = true;
  }
}

const bullmqPath = require.resolve('bullmq');
require.cache[bullmqPath] = {
  id: bullmqPath,
  filename: bullmqPath,
  loaded: true,
  exports: { Worker: FakeWorker }
};

const { createWorker } = require('../../src/core/worker');

describe('createWorker', () => {
  it('creates a worker with a close method', async () => {
    const { worker, close } = createWorker({
      queueName: 'test',
      connection: {},
      processor: () => {}
    });

    assert.ok(worker instanceof FakeWorker);

    await close();

    assert.ok(worker.closed);
  });
});

