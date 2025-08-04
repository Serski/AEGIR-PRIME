import { CharacterName } from '../value-objects';

export class Character {
  constructor(public readonly id: string, public name: CharacterName) {}
}
