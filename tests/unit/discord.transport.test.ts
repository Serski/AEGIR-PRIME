import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock discord.js before importing the adapter so that it uses the mock
const login = vi.fn();
const on = vi.fn();
const fetch = vi.fn();

const ClientMock = vi.fn(() => ({
  login,
  on,
  channels: { fetch },
}));

vi.mock('discord.js', () => ({
  Client: ClientMock,
  GatewayIntentBits: { Guilds: 1, GuildMessages: 2 },
}));

let DiscordTransportAdapter: any;

beforeEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
  DiscordTransportAdapter = (await import('../../src/interfaces/discord/transport')).DiscordTransportAdapter;
});

describe('DiscordTransportAdapter', () => {
  it('initializes the client and logs in', async () => {
    const adapter = new DiscordTransportAdapter();
    await adapter.init('token');

    expect(ClientMock).toHaveBeenCalledWith({ intents: [1, 2] });
    expect(login).toHaveBeenCalledWith('token');
  });

  it('sends messages to channels', async () => {
    const adapter = new DiscordTransportAdapter();
    await adapter.init('token');

    const send = vi.fn();
    fetch.mockResolvedValue({ send, isTextBased: () => true });

    await adapter.sendMessage('123', 'hello');

    expect(fetch).toHaveBeenCalledWith('123');
    expect(send).toHaveBeenCalledWith('hello');
  });

  it('registers event listeners', async () => {
    const adapter = new DiscordTransportAdapter();
    await adapter.init('token');

    const handler = vi.fn();
    adapter.on('ready', handler);

    expect(on).toHaveBeenCalledWith('ready', handler);
  });
});

