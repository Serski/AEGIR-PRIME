import { discordConfig } from '../config/discord';
import { DiscordTransportAdapter } from '../interfaces/discord/transport';
import { logger } from '../core/logger';

async function main(): Promise<void> {
  const adapter = new DiscordTransportAdapter();
  await adapter.init(discordConfig.token);

  adapter.useEventGateway({
    onReady: (client) => {
      logger.info(`Logged in as ${client.user?.tag ?? 'unknown'}`);
    },
  });
}

main().catch((err) => {
  logger.error(err, 'Failed to start bot');
  process.exit(1);
});
