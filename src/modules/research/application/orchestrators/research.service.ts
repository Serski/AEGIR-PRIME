import { inject, injectable } from 'tsyringe';
import { AddTechnology, GetTechnology } from '../use-cases';
import { Technology } from '../../domain';

@injectable()
export class ResearchService {
  constructor(
    @inject(AddTechnology)
    private readonly addTechnologyUseCase: AddTechnology,
    @inject(GetTechnology)
    private readonly getTechnologyUseCase: GetTechnology
  ) {}

  addTechnology(tech: Technology): void {
    this.addTechnologyUseCase.execute(tech);
  }

  getTechnology(id: string): Technology | undefined {
    return this.getTechnologyUseCase.execute(id);
  }
}
