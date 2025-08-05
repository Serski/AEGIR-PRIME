import { env } from 'process';

export interface DiscordConfig {
  token: string;
  clientId?: string;
  guildId?: string;
}

function requireEnv(key: string): string {
  const value = env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

function getEnv(key: string): string | undefined {
  return env[key];
}

const config: DiscordConfig = {
  token: requireEnv('DISCORD_TOKEN'),
  clientId: getEnv('DISCORD_CLIENT_ID'),
  guildId: getEnv('DISCORD_GUILD_ID'),
};

export const discordConfig: Readonly<DiscordConfig> = Object.freeze(config);

