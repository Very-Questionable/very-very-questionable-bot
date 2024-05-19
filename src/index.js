import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import eventHandler from './handlers/eventHandler.js';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const token = process.env.DISCORD_TOKEN;

eventHandler(client);

client.login(token);
