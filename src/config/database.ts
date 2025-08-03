import { env } from 'process';

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

function requireEnv(key: string): string {
  const value = env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

const config: DatabaseConfig = {
  host: requireEnv('DB_HOST'),
  port: Number.parseInt(requireEnv('DB_PORT'), 10),
  username: requireEnv('DB_USER'),
  password: requireEnv('DB_PASSWORD'),
  database: requireEnv('DB_NAME')
};

export const databaseConfig: Readonly<DatabaseConfig> = Object.freeze(config);

