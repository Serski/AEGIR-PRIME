import { injectable } from 'tsyringe';
import { Character } from '../domain';
import { CharacterRepository } from '../interfaces';

@injectable()
export class InMemoryCharacterRepository implements CharacterRepository {
  private readonly characters = new Map<string, Character>();

  add(character: Character): void {
    this.characters.set(character.id, character);
  }

  findById(id: string): Character | undefined {
    return this.characters.get(id);
  }
}
