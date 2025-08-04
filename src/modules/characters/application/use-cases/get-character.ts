import { inject, injectable } from 'tsyringe';
import { Character } from '../../domain';
import {
  CHARACTER_REPOSITORY,
  CharacterRepository,
} from '../../interfaces';

@injectable()
export class GetCharacter {
  constructor(
    @inject(CHARACTER_REPOSITORY)
    private readonly repo: CharacterRepository
  ) {}

  execute(id: string): Character | undefined {
    return this.repo.findById(id);
  }
}
