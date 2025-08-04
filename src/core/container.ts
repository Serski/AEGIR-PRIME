import 'reflect-metadata';
import { container, DependencyContainer } from 'tsyringe';
import { Worker } from './worker';
import { logger, Logger } from './logger';
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

  child.register<CharacterRepository>(CHARACTER_REPOSITORY, {
    useClass: InMemoryCharacterRepository
  });
  child.register(CharacterService, { useClass: CharacterService });

  child.register<WalletRepository>(WALLET_REPOSITORY, {
    useClass: InMemoryWalletRepository
  });
  child.register(EconomyService, { useClass: EconomyService });

  child.register<ListingRepository>(LISTING_REPOSITORY, {
    useClass: InMemoryListingRepository
  });
  child.register(MarketplaceService, { useClass: MarketplaceService });

  child.register<ResearchRepository>(RESEARCH_REPOSITORY, {
    useClass: InMemoryResearchRepository
  });
  child.register(ResearchService, { useClass: ResearchService });

  return child;
}
