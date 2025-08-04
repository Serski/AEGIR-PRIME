import { Client, GatewayIntentBits } from 'discord.js';
import { beforeAll, afterAll, describe, it, expect } from 'vitest';

const token = process.env.BOT_TOKEN;
const guildId = process.env.STAGING_GUILD_ID;

const skip = !token || !guildId;

(skip ? describe.skip : describe)('bot connection', () => {
  let client: Client;

  beforeAll(async () => {
    client = new Client({ intents: [GatewayIntentBits.Guilds] });
    await client.login(token!);
  });

  afterAll(async () => {
    await client.destroy();
  });

  it('connects to staging guild', async () => {
    const guild = await client.guilds.fetch(guildId!);
    expect(guild).toBeDefined();
  });
});
