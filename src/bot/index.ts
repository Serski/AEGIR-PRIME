import { discordConfig } from '../config/discord';
import { DiscordTransportAdapter } from '../interfaces/discord/transport';
import { logger } from '../core/logger';
import * as Ping from '../interfaces/discord/commands/ping';
import * as startCommand from '../interfaces/discord/commands/start';

async function main(): Promise<void> {
  const discord = new DiscordTransportAdapter();
  await discord.init(discordConfig.token);

  const commands = new Map<string, any>();
  commands.set(Ping.data.name, Ping);
  commands.set(startCommand.data.name, startCommand);

  discord.useEventGateway({
    onReady: async (client) => {
      logger.info(`Logged in as ${client.user?.tag ?? 'unknown'}`);

      const guildId = discordConfig.guildId;
      if (guildId) {
        await discord.registerGuildCommands(guildId, [Ping.data, startCommand.data]);
        logger.info('Registered guild commands');
      }
    },
    onInteraction: async (interaction) => {
      if (interaction.isModalSubmit()) {
        if (interaction.customId === 'start_modal') {
          await startCommand.handleModal(interaction);
        }
        return;
      }

      if (!interaction.isChatInputCommand()) {
        return;
      }

      const command = commands.get(interaction.commandName);
      if (!command) {
        return;
      }

      try {
        await command.execute(interaction);
      } catch (err) {
        logger.error(err, 'Error executing command');
        if (interaction.deferred || interaction.replied) {
          await interaction.followUp({
            content: 'There was an error while executing this command',
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content: 'There was an error while executing this command',
            ephemeral: true,
          });
        }
      }
    },
  });
}

main().catch((err) => {
  logger.error(err, 'Failed to start bot');
  process.exit(1);
});
