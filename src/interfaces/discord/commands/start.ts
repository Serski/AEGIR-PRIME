import {
  SlashCommandBuilder,
  type ChatInputCommandInteraction,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  type ModalSubmitInteraction,
  EmbedBuilder,
  MessageFlags,
} from 'discord.js';
import { createContainer } from '../../../core/container';
import { DATABASE_CLIENT, type DatabaseClient } from '../../../infrastructure/db/adapter';

export const data = new SlashCommandBuilder()
  .setName('start')
  .setDescription('Create your commander profile');

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const container = createContainer();
  const db = container.resolve<DatabaseClient>(DATABASE_CLIENT);

  const existingPlayer = await db.transaction((prisma) =>
    prisma.player.findUnique({ where: { discordId: interaction.user.id } }),
  );
  if (existingPlayer) {
    await interaction.reply({
      content: 'Profile already initialized. Use /panel.',
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const modal = new ModalBuilder().setCustomId('start_modal').setTitle('Commander Profile');

  const nameInput = new TextInputBuilder()
    .setCustomId('start_name')
    .setLabel('Name')
    .setMinLength(2)
    .setMaxLength(32)
    .setRequired(true)
    .setStyle(TextInputStyle.Short);

  const bioInput = new TextInputBuilder()
    .setCustomId('start_bio')
    .setLabel('Bio')
    .setMinLength(2)
    .setMaxLength(200)
    .setRequired(true)
    .setStyle(TextInputStyle.Paragraph);

  modal.addComponents(
    new ActionRowBuilder<TextInputBuilder>().addComponents(nameInput),
    new ActionRowBuilder<TextInputBuilder>().addComponents(bioInput),
  );

  await interaction.showModal(modal);
}

export async function handleModal(interaction: ModalSubmitInteraction): Promise<void> {
  const name = interaction.fields.getTextInputValue('start_name');
  const bio = interaction.fields.getTextInputValue('start_bio');

  const container = createContainer();
  const db = container.resolve<DatabaseClient>(DATABASE_CLIENT);

  try {
    await db.transaction(async (prisma) => {
      const player = await prisma.player.upsert({
        where: { discordId: interaction.user.id },
        update: { name, bio },
        create: {
          discordId: interaction.user.id,
          name,
          bio,
        },
      });

      const [afm, pcc, corvette] = await Promise.all([
        prisma.item.findUniqueOrThrow({ where: { key: 'afm' } }),
        prisma.item.findUniqueOrThrow({ where: { key: 'pcc' } }),
        prisma.item.findUniqueOrThrow({ where: { key: 'corvette' } }),
      ]);

      await Promise.all([
        prisma.inventory.upsert({
          where: { playerId_itemId: { playerId: player.id, itemId: afm.id } },
          update: { quantity: { increment: 50 } },
          create: { playerId: player.id, itemId: afm.id, quantity: 50 },
        }),
        prisma.inventory.upsert({
          where: { playerId_itemId: { playerId: player.id, itemId: pcc.id } },
          update: { quantity: { increment: 10 } },
          create: { playerId: player.id, itemId: pcc.id, quantity: 10 },
        }),
        prisma.inventory.upsert({
          where: { playerId_itemId: { playerId: player.id, itemId: corvette.id } },
          update: { quantity: { increment: 1 } },
          create: { playerId: player.id, itemId: corvette.id, quantity: 1 },
        }),
      ]);
    });

    const embed = new EmbedBuilder()
      .setTitle('Classification accepted.')
      .addFields({ name: 'Balance', value: '100000', inline: true })
      .setFooter({ text: 'AEGIR PANEL SYSTEM' });

    await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
  } catch (err) {
    console.error(err);
    await interaction.reply({
      content: 'There was an error while creating your profile.',
      flags: MessageFlags.Ephemeral,
    });
  }
}

