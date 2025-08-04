import { inject, injectable } from 'tsyringe';
import { Technology } from '../domain';
import { RESEARCH_REPOSITORY, ResearchRepository } from '../interfaces';

@injectable()
export class ResearchService {
  constructor(
    @inject(RESEARCH_REPOSITORY) private readonly repo: ResearchRepository
  ) {}

  addTechnology(tech: Technology): void {
    this.repo.add(tech);
  }

  getTechnology(id: string): Technology | undefined {
    return this.repo.get(id);
  }
}
