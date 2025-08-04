import 'reflect-metadata';
import { describe, it, expect } from 'vitest';
import { createContainer } from '../../src/core/container';
import {
  CharacterService,
  Character,
  CharacterName,
} from '../../src/modules/characters';
import { EconomyService } from '../../src/modules/economy';
import {
  MarketplaceService,
  Listing,
  Price,
} from '../../src/modules/marketplace';
import {
  ResearchService,
  Technology,
  TechnologyName,
} from '../../src/modules/research';

describe('module integration', () => {
  it('resolves services from container', () => {
    const c = createContainer();

    const characterService = c.resolve(CharacterService);
    characterService.create(new Character('1', new CharacterName('Alice')));
    expect(characterService.get('1')?.name.value).toBe('Alice');

    const economyService = c.resolve(EconomyService);
    economyService.deposit('w1', 10);
    expect(economyService.getBalance('w1')).toBe(10);

    const marketplaceService = c.resolve(MarketplaceService);
    marketplaceService.listItem(new Listing('l1', 'Sword', new Price(5)));
    expect(marketplaceService.getListing('l1')?.price.value).toBe(5);

    const researchService = c.resolve(ResearchService);
    researchService.addTechnology(
      new Technology('t1', new TechnologyName('AI'))
    );
    expect(researchService.getTechnology('t1')?.name.value).toBe('AI');
  });
});
