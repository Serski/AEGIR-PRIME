import { Wallet } from '../domain';

export interface WalletRepository {
  get(id: string): Wallet | undefined;
  save(wallet: Wallet): void;
}

export const WALLET_REPOSITORY = 'WalletRepository';
