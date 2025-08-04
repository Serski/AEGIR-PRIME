import { Character } from '../domain';

export interface CharacterRepository {
  add(character: Character): void;
  findById(id: string): Character | undefined;
}

export const CHARACTER_REPOSITORY = 'CharacterRepository';
