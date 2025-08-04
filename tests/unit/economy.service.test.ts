import 'reflect-metadata';
import { describe, it, expect } from 'vitest';
import { EconomyService, InMemoryWalletRepository } from '../../src/modules/economy';

describe('EconomyService', () => {
  it('deposits funds and retrieves balance', () => {
    const repo = new InMemoryWalletRepository();
    const service = new EconomyService(repo);
    service.deposit('wallet1', 100);
    expect(service.getBalance('wallet1')).toBe(100);
  });
});
