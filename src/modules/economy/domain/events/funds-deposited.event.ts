import { Wallet } from '../entities';
import { Currency } from '../value-objects';

export class FundsDepositedEvent {
  constructor(public readonly wallet: Wallet, public readonly amount: Currency) {}
}
