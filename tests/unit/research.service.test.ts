import 'reflect-metadata';
import { describe, it, expect } from 'vitest';
import { ResearchService, InMemoryResearchRepository } from '../../src/modules/research';

describe('ResearchService', () => {
  it('adds and retrieves technologies', () => {
    const repo = new InMemoryResearchRepository();
    const service = new ResearchService(repo);
    const tech = { id: '1', name: 'AI' };
    service.addTechnology(tech);
    expect(service.getTechnology('1')).toEqual(tech);
  });
});
