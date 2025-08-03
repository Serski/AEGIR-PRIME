import 'reflect-metadata';
import { DependencyContainer, container } from 'tsyringe';
import { logger } from './logger';
import { createWorker } from './worker';

export function createContainer(): DependencyContainer {
  container.register('logger', { useValue: logger });
  container.register('worker', { useFactory: () => createWorker() });

  return container;
}
