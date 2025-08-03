import 'reflect-metadata';
import { container, type DependencyContainer } from 'tsyringe';
import { createWorker, type CreateWorkerOptions, type CreatedWorker } from './worker';
import { logger, type Logger } from './logger';

export function createContainer(options: CreateWorkerOptions): DependencyContainer {
  const child = container.createChildContainer();
  child.register<Logger>('logger', { useValue: logger });
  child.register<CreatedWorker>('worker', { useValue: createWorker(options) });
  return child;
}

