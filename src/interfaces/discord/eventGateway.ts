import { Client, Interaction, Events } from 'discord.js';

export interface EventGatewayOptions {
  onReady?: (client: Client) => void;
  onInteraction?: (interaction: Interaction) => void | Promise<void>;
}

export function eventGateway(
  client: Client,
  options: EventGatewayOptions = {},
): void {
  if (options.onReady) {
    client.once(Events.ClientReady, () => options.onReady!(client));
  }

  if (options.onInteraction) {
    client.on(Events.InteractionCreate, options.onInteraction);
  }
}
