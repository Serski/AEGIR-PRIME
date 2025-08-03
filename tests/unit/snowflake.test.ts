import { describe, it, expect } from 'vitest';
import { generateSnowflake } from '../../src/shared/snowflake';

describe('generateSnowflake', () => {
  it('produces non-empty unique ids', () => {
    const ids = new Set<string>();

    for (let i = 0; i < 1000; i++) {
      const id = generateSnowflake();
      expect(id).not.toBe('');
      ids.add(id);
    }

    expect(ids.size).toBe(1000);
  });
});

