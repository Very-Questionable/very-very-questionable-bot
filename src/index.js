import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import eventHandler from './handlers/eventHandler.js';

const commands = [
  {
    name: 'test',
    description: 'test command'
  }
]


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

const clientId = parseInt(process.env.CLIENT_ID);
const token = process.env.DISCORD_TOKEN;
const guildId = parseInt(process.env.GUILD_ID);

// client.on('ready', (c) => {
//   console.log(`BOT ${c.user.tag} ON APSDASDALKSDJLKASJD LETS JOOEEE`);
//   // console.log(client);
//   console.log(clientId);

// });

// client.on('messageCreate', async (message) => {
//   if (message?.author.bot) return; 
//   console.log(message.channelId);

//   if (message?.content == "obtain messages") getAllMessages(message.channelId);
// });


// client.on('interactionCreate', async (interaction) => {
//   if (!interaction.isCommand()) return;

//   const { commandName } = interaction;

// })


// // function to obtain every message in a channel: stack overflow
// const getAllMessages = async (channelId) => {
  
//   const channel = client.channels.cache.get(channelId);
//   let messages = [];

//   // Create message pointer
//   let message = await channel.messages
//     .fetch({ limit: 1 })
//     .then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));

//   while (message) {
//     await channel.messages
//       .fetch({ limit: 100, before: message.id })
//       .then(messagePage => {
//         messagePage.forEach(msg => messages.push(msg));

//         // Update our message pointer to be the last message on the page of messages
//         message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
//       });
//   }

//   console.log(messages.map(msg => msg.content));  // Print all messages
//   return messages;
// }

eventHandler(client);

// loadApplications();

client.login(token);
