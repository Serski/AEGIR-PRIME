import 'reflect-metadata';
import { describe, it, expect } from 'vitest';
import { createContainer } from '../../src/core/container';
import { CharacterService } from '../../src/modules/characters';
import { EconomyService } from '../../src/modules/economy';
import { MarketplaceService } from '../../src/modules/marketplace';
import { ResearchService } from '../../src/modules/research';

describe('module integration', () => {
  it('resolves services from container', () => {
    const c = createContainer();

    const characterService = c.resolve(CharacterService);
    characterService.create({ id: '1', name: 'Alice' });
    expect(characterService.get('1')?.name).toBe('Alice');

    const economyService = c.resolve(EconomyService);
    economyService.deposit('w1', 10);
    expect(economyService.getBalance('w1')).toBe(10);

    const marketplaceService = c.resolve(MarketplaceService);
    marketplaceService.listItem({ id: 'l1', title: 'Sword', price: 5 });
    expect(marketplaceService.getListing('l1')?.price).toBe(5);

    const researchService = c.resolve(ResearchService);
    researchService.addTechnology({ id: 't1', name: 'AI' });
    expect(researchService.getTechnology('t1')?.name).toBe('AI');
  });
});
