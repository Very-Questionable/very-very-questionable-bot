import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';

const ban = {
  name: 'ban',
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
  callBack: (client, interaction) => {
    interaction.reply('https://tenor.com/view/jjk-gojo-toji-hollow-purple-yap-gif-8931181437447148145');
  },
};

export default ban;
