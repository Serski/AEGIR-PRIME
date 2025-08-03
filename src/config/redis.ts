import { env } from 'process';

export interface RedisConfig {
  host: string;
  port: number;
  password: string;
}

function requireEnv(key: string): string {
  const value = env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

const config: RedisConfig = {
  host: requireEnv('REDIS_HOST'),
  port: Number.parseInt(requireEnv('REDIS_PORT'), 10),
  password: requireEnv('REDIS_PASSWORD')
};

export const redisConfig: Readonly<RedisConfig> = Object.freeze(config);

