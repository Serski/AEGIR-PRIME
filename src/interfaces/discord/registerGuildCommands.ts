import { Client, ApplicationCommandDataResolvable } from 'discord.js';

export async function registerGuildCommands(
  client: Client,
  guildId: string,
  commands: ApplicationCommandDataResolvable[],
): Promise<void> {
  const guild = await client.guilds.fetch(guildId);
  await guild.commands.set(commands);
}
