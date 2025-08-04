import 'reflect-metadata';
import { describe, it, expect } from 'vitest';
import {
  ResearchService,
  InMemoryResearchRepository,
  AddTechnology,
  GetTechnology,
  Technology,
  TechnologyName,
} from '../../src/modules/research';

describe('ResearchService', () => {
  it('adds and retrieves technologies', () => {
    const repo = new InMemoryResearchRepository();
    const service = new ResearchService(
      new AddTechnology(repo),
      new GetTechnology(repo)
    );
    const tech = new Technology('1', new TechnologyName('AI'));
    service.addTechnology(tech);
    expect(service.getTechnology('1')).toEqual(tech);
  });
});
