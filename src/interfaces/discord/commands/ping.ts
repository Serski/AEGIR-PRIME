import { SlashCommandBuilder, type ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Health check');

export async function execute(
  interaction: ChatInputCommandInteraction,
): Promise<void> {
  await interaction.reply({
    content: `pong ${process.uptime()}`,
    ephemeral: true,
  });
}
