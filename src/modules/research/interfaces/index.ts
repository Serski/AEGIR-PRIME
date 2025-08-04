import { Technology } from '../domain';

export interface ResearchRepository {
  add(tech: Technology): void;
  get(id: string): Technology | undefined;
}

export const RESEARCH_REPOSITORY = 'ResearchRepository';
