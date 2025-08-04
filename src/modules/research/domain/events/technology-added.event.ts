import { Technology } from '../entities';

export class TechnologyAddedEvent {
  constructor(public readonly technology: Technology) {}
}
