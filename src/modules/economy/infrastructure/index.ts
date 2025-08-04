import { injectable } from 'tsyringe';
import { Wallet } from '../domain';
import { WalletRepository } from '../interfaces';

@injectable()
export class InMemoryWalletRepository implements WalletRepository {
  private readonly wallets = new Map<string, Wallet>();

  get(id: string): Wallet | undefined {
    return this.wallets.get(id);
  }

  save(wallet: Wallet): void {
    this.wallets.set(wallet.id, wallet);
  }
}
