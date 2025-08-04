import { inject, injectable } from 'tsyringe';
import { Technology } from '../../domain';
import {
  RESEARCH_REPOSITORY,
  ResearchRepository,
} from '../../interfaces';

@injectable()
export class AddTechnology {
  constructor(
    @inject(RESEARCH_REPOSITORY)
    private readonly repo: ResearchRepository
  ) {}

  execute(tech: Technology): void {
    this.repo.add(tech);
  }
}
