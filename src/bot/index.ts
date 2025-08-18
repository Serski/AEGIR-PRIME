import { discordConfig } from '../config/discord';
import { DiscordTransportAdapter } from '../interfaces/discord/transport';
import { logger } from '../core/logger';
import * as Ping from '../interfaces/discord/commands/ping';

async function main(): Promise<void> {
  const discord = new DiscordTransportAdapter();
  await discord.init(discordConfig.token);

  const commands = { ping: Ping } as const;

  discord.useEventGateway({
    onReady: async (client) => {
      logger.info(`Logged in as ${client.user?.tag ?? 'unknown'}`);

      const guildId = discordConfig.guildId;
      if (guildId) {
        await discord.registerGuildCommands(guildId, [Ping.data]);
        logger.info('Registered guild commands');
      }
    },
    onInteraction: async (interaction) => {
      if (!interaction.isChatInputCommand()) {
        return;
      }

      const command = commands[interaction.commandName as keyof typeof commands];
      if (!command) {
        return;
      }

      await command.execute(interaction);
    },
  });
}

main().catch((err) => {
  logger.error(err, 'Failed to start bot');
  process.exit(1);
});
