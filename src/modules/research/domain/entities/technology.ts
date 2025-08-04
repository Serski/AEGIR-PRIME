import { TechnologyName } from '../value-objects';

export class Technology {
  constructor(public readonly id: string, public name: TechnologyName) {}
}
