import { ApplicationCommandOptionType } from 'discord.js';
import getAllMessages from '../../utils/getAllMessages.js';
import fs from 'fs/promises';
import os, { type } from 'os';

const speadsheet = {
  name: 'speadsheet',
  description: 'gym spreadsheet',
  options: [
    {
      name: 'target-user',
      description: 'The user to generate a spreadsheat from',
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: 'channel',
      description: 'Name of the channel with the Data',
      type: ApplicationCommandOptionType.Channel,
    },
    {
      name: 'filter',
      description: 'Exersise filter, name an exersise for a that specific exersise',
      type: ApplicationCommandOptionType.String,
    },
  ],
  callback: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: true });

    const targetUser = interaction.options.getUser('target-user')?.id;
    const targetChannel = interaction.options.getChannel('channel')?.id;
    const targetFilter = interaction.options.getString('filter');
    const messages = await getAllMessages(client, targetChannel ? targetChannel : interaction.channelId);
    console.log(interaction);

    // splits on newlines and applies filter if needed
    const buffer = [];
    for (const msg of messages) {
      // Checks the msg author is the correct target
      if (targetUser && msg.author.id !== targetUser) continue;
      if (!targetUser && msg.author.id !== interaction.user.id) continue;

      // Applies Formatting and Filters for exersises
      msg.content.split('\n').forEach((content) => {
        if (!content.match(/(,\s*[123456790-]+\s*){6},?/)) return;
        if (targetFilter && !content.match(targetFilter)) return;

        buffer.push({
          content: content,
          timestamp: msg.createdTimestamp,
        });
      });
    }

    const res = buffer.map((msg) => {
      const buffer = msg.content.split(',');
      const exersise = buffer.splice(0, 1);
      for (let i in buffer) {
        buffer[i] = buffer[i].trim();
        if (buffer[i] === '-') buffer[i] = buffer[i - 1];
      }
      const notes = isNaN(buffer[buffer.length - 1]) ? buffer.pop() : '';

      return {
        timestamp: new Date(msg.timestamp),
        content: buffer,
        exersise: exersise[0],
        notes: notes,
      };
    });

    const cleanedData = formatData(res);
    const dest = await storeSpreadsheet(cleanedData);

    await interaction.editReply({
      content: "Here is you're spreadsheet :D",
      files: [dest],
      ephemeral: true,
    });

    console.log(`spreadsheet sent to ${dest}`);
  },
};

// stores the created spreadsheet in a temporary file
const storeSpreadsheet = async (data, path) => {
  const dest = `${!path ? os.tmpdir() : path}/gym-spreadsheet.csv`;
  await fs.writeFile(dest, data.join(''), 'utf8');
  console.log(`writen to ${dest}`);
  return dest;
};

const formatData = (data) => {
  data.sort((a, b) => a.timestamp - b.timestamp);
  const res = data.map(
    (entry) =>
      `${entry.exersise},${entry.timestamp.toLocaleDateString('en-GB')},${entry.content.join(',')},${entry.notes}\n`
  );

  res.unshift('Exersise,Timestamp,Weight 1,Weight 2,Weight 3,Set 1,Set 2,Set 3,Notes\n');
  res.unshift('\ufeff');
  return res;
};

export default speadsheet;
