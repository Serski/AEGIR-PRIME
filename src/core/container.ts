import 'reflect-metadata';
import { container, DependencyContainer } from 'tsyringe';
import { Worker } from './worker';
import { logger, Logger } from './logger';
import {
  DatabaseAdapter,
  DATABASE_CLIENT,
  DatabaseClient,
} from '../infrastructure/db/adapter';
import { CacheAdapter, CACHE_CLIENT, CacheClient } from '../infrastructure/cache/adapter';
import { QueueAdapter, QUEUE_CLIENT, QueueClient } from '../infrastructure/queue/adapter';
import { StorageAdapter, STORAGE_CLIENT, StorageClient } from '../infrastructure/storage/adapter';
import { ImagingAdapter, IMAGING_CLIENT, ImagingClient } from '../infrastructure/imaging/adapter';
import {
  CharacterService,
  InMemoryCharacterRepository,
  CHARACTER_REPOSITORY,
  CharacterRepository
} from '../modules/characters';
import {
  EconomyService,
  InMemoryWalletRepository,
  WALLET_REPOSITORY,
  WalletRepository
} from '../modules/economy';
import {
  MarketplaceService,
  InMemoryListingRepository,
  LISTING_REPOSITORY,
  ListingRepository
} from '../modules/marketplace';
import {
  ResearchService,
  InMemoryResearchRepository,
  RESEARCH_REPOSITORY,
  ResearchRepository
} from '../modules/research';

export function createContainer(): DependencyContainer {
  const child = container.createChildContainer();
  child.register<Logger>('logger', { useValue: logger });
  child.register(Worker, {
    useFactory: (c) => new Worker(c.resolve('logger'))
  });

  child.registerSingleton<CharacterRepository>(
    CHARACTER_REPOSITORY,
    InMemoryCharacterRepository
  );
  child.register(CharacterService, { useClass: CharacterService });

  child.registerSingleton<WalletRepository>(
    WALLET_REPOSITORY,
    InMemoryWalletRepository
  );
  child.register(EconomyService, { useClass: EconomyService });

  child.registerSingleton<ListingRepository>(
    LISTING_REPOSITORY,
    InMemoryListingRepository
  );
  child.register(MarketplaceService, { useClass: MarketplaceService });

  child.registerSingleton<ResearchRepository>(
    RESEARCH_REPOSITORY,
    InMemoryResearchRepository
  );
  child.register(ResearchService, { useClass: ResearchService });

  child.register<DatabaseClient>(DATABASE_CLIENT, { useClass: DatabaseAdapter });
  child.register<CacheClient>(CACHE_CLIENT, { useClass: CacheAdapter });
  child.register<QueueClient>(QUEUE_CLIENT, {
    useFactory: () => new QueueAdapter('default'),
  });
  child.register<StorageClient>(STORAGE_CLIENT, { useClass: StorageAdapter });
  child.register<ImagingClient>(IMAGING_CLIENT, { useClass: ImagingAdapter });

  return child;
}
