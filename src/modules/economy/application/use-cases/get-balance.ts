import { inject, injectable } from 'tsyringe';
import { WALLET_REPOSITORY, WalletRepository } from '../../interfaces';

@injectable()
export class GetBalance {
  constructor(
    @inject(WALLET_REPOSITORY)
    private readonly repo: WalletRepository
  ) {}

  execute(id: string): number {
    const wallet = this.repo.get(id);
    return wallet ? wallet.balance.value : 0;
  }
}
