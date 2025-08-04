import { Currency } from '../value-objects';

export class Wallet {
  constructor(public readonly id: string, public balance: Currency) {}

  deposit(amount: Currency): void {
    this.balance = new Currency(this.balance.value + amount.value);
  }
}
