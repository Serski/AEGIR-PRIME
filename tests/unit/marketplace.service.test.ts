import 'reflect-metadata';
import { describe, it, expect } from 'vitest';
import { MarketplaceService, InMemoryListingRepository } from '../../src/modules/marketplace';

describe('MarketplaceService', () => {
  it('lists and retrieves items', () => {
    const repo = new InMemoryListingRepository();
    const service = new MarketplaceService(repo);
    const listing = { id: '1', title: 'Sword', price: 50 };
    service.listItem(listing);
    expect(service.getListing('1')).toEqual(listing);
  });
});
