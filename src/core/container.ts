import 'reflect-metadata';
import { container, DependencyContainer } from 'tsyringe';
import { Worker } from './worker';
import { logger, Logger } from './logger';

export function createContainer(): DependencyContainer {
  const child = container.createChildContainer();
  child.register<Logger>('logger', { useValue: logger });
  child.register(Worker, {
    useFactory: (c) => new Worker(c.resolve('logger'))
  });
  return child;
}
