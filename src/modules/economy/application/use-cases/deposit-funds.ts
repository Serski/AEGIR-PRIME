import { inject, injectable } from 'tsyringe';
import { Wallet, Currency } from '../../domain';
import { WALLET_REPOSITORY, WalletRepository } from '../../interfaces';

@injectable()
export class DepositFunds {
  constructor(
    @inject(WALLET_REPOSITORY)
    private readonly repo: WalletRepository
  ) {}

  execute(id: string, amount: number): Wallet {
    const wallet = this.repo.get(id) ?? new Wallet(id, new Currency(0));
    wallet.deposit(new Currency(amount));
    this.repo.save(wallet);
    return wallet;
  }
}
