import 'reflect-metadata';
import { describe, it, expect } from 'vitest';
import { CharacterService, InMemoryCharacterRepository } from '../../src/modules/characters';

describe('CharacterService', () => {
  it('creates and retrieves characters', () => {
    const repo = new InMemoryCharacterRepository();
    const service = new CharacterService(repo);
    const character = { id: '1', name: 'Alice' };
    service.create(character);
    expect(service.get('1')).toEqual(character);
  });
});
