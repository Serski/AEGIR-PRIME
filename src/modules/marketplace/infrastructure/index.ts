import { injectable } from 'tsyringe';
import { Listing } from '../domain';
import { ListingRepository } from '../interfaces';

@injectable()
export class InMemoryListingRepository implements ListingRepository {
  private readonly listings = new Map<string, Listing>();

  add(listing: Listing): void {
    this.listings.set(listing.id, listing);
  }

  find(id: string): Listing | undefined {
    return this.listings.get(id);
  }
}
