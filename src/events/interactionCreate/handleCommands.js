import getLocalCommands from '../../utils/getLocalCommands.js';

const handleCommands = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const localCommands = await getLocalCommands();

  try {
    const commandObj = localCommands.find((cmd) => cmd.default.name === interaction.commandName)?.default;
    if (!commandObj) return;

    if (commandObj.permissionsRequired) {
      for (const perm of commandObj.permissionsRequired) {
        if (!interaction.member.permissions.has(perm)) {
          interaction.reply({
            content: 'not enough perms',
            ephemeral: true,
          });
          break;
        }
      }
    }

    await commandObj.callback(client, interaction);
  } catch (error) {
    console.log(error);
  }
};

export default handleCommands;
