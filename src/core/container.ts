import { container, type DependencyContainer } from 'tsyringe';
import { createWorker, type CreateWorkerOptions, type CreatedWorker } from './worker';

export function createContainer(options: CreateWorkerOptions): DependencyContainer {
  const di = container.createChildContainer();
  di.register<CreatedWorker>('worker', { useValue: createWorker(options) });
  return di;
}

