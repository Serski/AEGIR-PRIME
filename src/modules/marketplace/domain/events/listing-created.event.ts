import { Listing } from '../entities';

export class ListingCreatedEvent {
  constructor(public readonly listing: Listing) {}
}
