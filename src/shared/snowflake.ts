import { randomUUID } from 'crypto';

export type Snowflake = string;

/**
 * Generates a unique identifier suitable for use as a snowflake.
 *
 * Uses the platform `randomUUID` implementation which provides a
 * cryptographically strong random value, ensuring a very low chance of
 * collision.
 */
export function generateSnowflake(): Snowflake {
  return randomUUID();
}
