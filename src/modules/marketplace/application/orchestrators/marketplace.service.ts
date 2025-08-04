import { inject, injectable } from 'tsyringe';
import { GetListing, ListItem } from '../use-cases';
import { Listing } from '../../domain';

@injectable()
export class MarketplaceService {
  constructor(
    @inject(ListItem) private readonly listItemUseCase: ListItem,
    @inject(GetListing) private readonly getListingUseCase: GetListing
  ) {}

  listItem(listing: Listing): void {
    this.listItemUseCase.execute(listing);
  }

  getListing(id: string): Listing | undefined {
    return this.getListingUseCase.execute(id);
  }
}
