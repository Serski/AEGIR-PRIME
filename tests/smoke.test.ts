import { describe, it, expect } from 'vitest';

// Smoke test to ensure the package main entry resolves
// Uses the main field in package.json (dist/core/index.js)
describe('package main entry', () => {
  it('resolves without error', async () => {
    const mod = await import('..');
    expect(mod).toBeTruthy();
  });
});
