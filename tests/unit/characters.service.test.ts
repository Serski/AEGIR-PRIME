import 'reflect-metadata';
import { describe, it, expect } from 'vitest';
import {
  CharacterService,
  InMemoryCharacterRepository,
  CreateCharacter,
  GetCharacter,
  Character,
  CharacterName,
} from '../../src/modules/characters';

describe('CharacterService', () => {
  it('creates and retrieves characters', () => {
    const repo = new InMemoryCharacterRepository();
    const service = new CharacterService(
      new CreateCharacter(repo),
      new GetCharacter(repo)
    );
    const character = new Character('1', new CharacterName('Alice'));
    service.create(character);
    expect(service.get('1')).toEqual(character);
  });
});
