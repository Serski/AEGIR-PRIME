import { Listing } from '../domain';

export interface ListingRepository {
  add(listing: Listing): void;
  find(id: string): Listing | undefined;
}

export const LISTING_REPOSITORY = 'ListingRepository';
