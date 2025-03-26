import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';

const ban = {
  name: 'mod-abuse',
  description: 'goodbye :D',
  options: [
    {
      name: 'target-user',
      description: 'The user to ban',
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: 'reason',
      description: 'Reason for banning',
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  callback: (client, interaction) => {
    interaction.reply('https://tenor.com/view/jjk-gojo-toji-hollow-purple-yap-gif-8931181437447148145');
  },
  deleted: true
};

export default ban;
