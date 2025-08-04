import { inject, injectable } from 'tsyringe';
import { Technology } from '../../domain';
import {
  RESEARCH_REPOSITORY,
  ResearchRepository,
} from '../../interfaces';

@injectable()
export class GetTechnology {
  constructor(
    @inject(RESEARCH_REPOSITORY)
    private readonly repo: ResearchRepository
  ) {}

  execute(id: string): Technology | undefined {
    return this.repo.get(id);
  }
}
