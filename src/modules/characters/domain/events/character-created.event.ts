import { Character } from '../entities';

export class CharacterCreatedEvent {
  constructor(public readonly character: Character) {}
}
