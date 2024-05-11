import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
});

client.on('ready', (c) => {
  console.log(`BOT ${c.user.tag} ON APSDASDALKSDJLKASJD LETS JOOEEE`);
})


client.on("messageCreate", async (message) => {
  
  console.log(message);
  if (!message?.author.bot) message.reply(`MWAHAHAAH: ${message.content}`);
});


// client.on('')
client.login(process.env.DISCORD_TOKEN);