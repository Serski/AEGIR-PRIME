import { inject, injectable } from 'tsyringe';
import { Listing } from '../../domain';
import {
  LISTING_REPOSITORY,
  ListingRepository,
} from '../../interfaces';

@injectable()
export class ListItem {
  constructor(
    @inject(LISTING_REPOSITORY)
    private readonly repo: ListingRepository
  ) {}

  execute(listing: Listing): void {
    this.repo.add(listing);
  }
}
