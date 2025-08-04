import { inject, injectable } from 'tsyringe';
import { CreateCharacter, GetCharacter } from '../use-cases';
import { Character } from '../../domain';

@injectable()
export class CharacterService {
  constructor(
    @inject(CreateCharacter) private readonly createCharacter: CreateCharacter,
    @inject(GetCharacter) private readonly getCharacter: GetCharacter
  ) {}

  create(character: Character): void {
    this.createCharacter.execute(character);
  }

  get(id: string): Character | undefined {
    return this.getCharacter.execute(id);
  }
}
