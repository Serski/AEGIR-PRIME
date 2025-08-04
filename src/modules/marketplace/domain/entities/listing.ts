import { Price } from '../value-objects';

export class Listing {
  constructor(
    public readonly id: string,
    public title: string,
    public price: Price
  ) {}
}
