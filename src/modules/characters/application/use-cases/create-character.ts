import { inject, injectable } from 'tsyringe';
import { Character } from '../../domain';
import {
  CHARACTER_REPOSITORY,
  CharacterRepository,
} from '../../interfaces';

@injectable()
export class CreateCharacter {
  constructor(
    @inject(CHARACTER_REPOSITORY)
    private readonly repo: CharacterRepository
  ) {}

  execute(character: Character): void {
    this.repo.add(character);
  }
}
