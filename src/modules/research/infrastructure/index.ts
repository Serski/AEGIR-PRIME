import { injectable } from 'tsyringe';
import { Technology } from '../domain';
import { ResearchRepository } from '../interfaces';

@injectable()
export class InMemoryResearchRepository implements ResearchRepository {
  private readonly techs = new Map<string, Technology>();

  add(tech: Technology): void {
    this.techs.set(tech.id, tech);
  }

  get(id: string): Technology | undefined {
    return this.techs.get(id);
  }
}
