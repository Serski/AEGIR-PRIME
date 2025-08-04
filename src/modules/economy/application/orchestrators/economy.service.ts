import { inject, injectable } from 'tsyringe';
import { DepositFunds, GetBalance } from '../use-cases';

@injectable()
export class EconomyService {
  constructor(
    @inject(DepositFunds) private readonly depositFunds: DepositFunds,
    @inject(GetBalance) private readonly getBalanceUseCase: GetBalance
  ) {}

  getBalance(id: string): number {
    return this.getBalanceUseCase.execute(id);
  }

  deposit(id: string, amount: number): void {
    this.depositFunds.execute(id, amount);
  }
}
