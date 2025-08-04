import { inject, injectable } from 'tsyringe';
import { Character } from '../domain';
import { CHARACTER_REPOSITORY, CharacterRepository } from '../interfaces';

@injectable()
export class CharacterService {
  constructor(
    @inject(CHARACTER_REPOSITORY) private readonly repo: CharacterRepository
  ) {}

  create(character: Character): void {
    this.repo.add(character);
  }

  get(id: string): Character | undefined {
    return this.repo.findById(id);
  }
}
