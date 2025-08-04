import { inject, injectable } from 'tsyringe';
import { Listing } from '../../domain';
import {
  LISTING_REPOSITORY,
  ListingRepository,
} from '../../interfaces';

@injectable()
export class GetListing {
  constructor(
    @inject(LISTING_REPOSITORY)
    private readonly repo: ListingRepository
  ) {}

  execute(id: string): Listing | undefined {
    return this.repo.find(id);
  }
}
