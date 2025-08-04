import { inject, injectable } from 'tsyringe';
import { Listing } from '../domain';
import { LISTING_REPOSITORY, ListingRepository } from '../interfaces';

@injectable()
export class MarketplaceService {
  constructor(
    @inject(LISTING_REPOSITORY) private readonly repo: ListingRepository
  ) {}

  listItem(listing: Listing): void {
    this.repo.add(listing);
  }

  getListing(id: string): Listing | undefined {
    return this.repo.find(id);
  }
}
