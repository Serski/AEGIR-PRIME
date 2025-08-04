import {
  Client,
  GatewayIntentBits,
  type ClientOptions,
} from 'discord.js';

/**
 * Minimal wrapper around the `discord.js` client exposing a small,
 * promise based API used by the project.  The adapter is responsible for
 * connecting to Discord, sending messages to channels and allowing consumers
 * to listen to client events.
 */
export class DiscordTransportAdapter {
  private client?: Client;

  /**
   * Create and login the Discord client.  Consumers may optionally pass
   * additional {@link ClientOptions}.  A basic set of intents is provided by
   * default to allow the bot to operate in guild text channels.
   */
  async init(token: string, options: Partial<ClientOptions> = {}): Promise<void> {
    const clientOptions: ClientOptions = {
      ...options,
      intents:
        options.intents ?? [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    };

    this.client = new Client(clientOptions);

    await this.client.login(token);
  }

  private getClient(): Client {
    if (!this.client) {
      throw new Error('Discord client not initialized');
    }

    return this.client;
  }

  /**
   * Send a message to the specified channel.  The channel must be text based
   * otherwise an error is thrown.
   */
  async sendMessage(channelId: string, content: string): Promise<void> {
    const client = this.getClient();
    const channel = await client.channels.fetch(channelId);
    if (!channel || !channel.isTextBased()) {
      throw new Error('Channel not found or not text based');
    }

    await (channel as any).send(content);
  }

  /**
   * Register an event listener on the underlying Discord client.
   */
  on(event: string, listener: (...args: any[]) => void): void {
    const client = this.getClient();
    client.on(event, listener);
  }
}

