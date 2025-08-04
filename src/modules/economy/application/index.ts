import { inject, injectable } from 'tsyringe';
import { Wallet } from '../domain';
import { WALLET_REPOSITORY, WalletRepository } from '../interfaces';

@injectable()
export class EconomyService {
  constructor(
    @inject(WALLET_REPOSITORY) private readonly repo: WalletRepository
  ) {}

  getBalance(id: string): number {
    const wallet = this.repo.get(id);
    return wallet ? wallet.balance : 0;
  }

  deposit(id: string, amount: number): void {
    const wallet = this.repo.get(id) || { id, balance: 0 };
    wallet.balance += amount;
    this.repo.save(wallet);
  }
}
