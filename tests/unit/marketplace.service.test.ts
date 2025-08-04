import 'reflect-metadata';
import { describe, it, expect } from 'vitest';
import {
  MarketplaceService,
  InMemoryListingRepository,
  ListItem,
  GetListing,
  Listing,
  Price,
} from '../../src/modules/marketplace';

describe('MarketplaceService', () => {
  it('lists and retrieves items', () => {
    const repo = new InMemoryListingRepository();
    const service = new MarketplaceService(
      new ListItem(repo),
      new GetListing(repo)
    );
    const listing = new Listing('1', 'Sword', new Price(50));
    service.listItem(listing);
    expect(service.getListing('1')).toEqual(listing);
  });
});
