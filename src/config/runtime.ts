import { env } from 'process';

export interface RuntimeConfig {
  nodeEnv: string;
  port: number;
}

function requireEnv(key: string): string {
  const value = env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

const config: RuntimeConfig = {
  nodeEnv: requireEnv('NODE_ENV'),
  port: Number.parseInt(requireEnv('PORT'), 10)
};

export const runtimeConfig: Readonly<RuntimeConfig> = Object.freeze(config);

