import { getConfig } from '../../utils/datastore.js';
import getLocalCommands from '../../utils/getLocalCommands.js';
import getApplicationCommands from '../../utils/getApplicationCommands.js';

const registerCommands = async (client) => {
  const { testGuild } = getConfig();
  try {
    const localCommands = await getLocalCommands();
    const applicationCommands = await getApplicationCommands(client, testGuild);

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand.default;
      const existingCommand = await applicationCommands.cache.find((res) => res.name === name);

      if (existingCommand) {
        if (localCommand.default.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`deleted "${name}"`);
          continue;
        }

        // if (areCommandsDifferent(existingCommand, localCommand)) {
        await applicationCommands.edit(existingCommand.id, {
          description,
          options,
        });
        console.log(`Edited Command ${name}.`);
        // }
      } else {
        if (localCommand.default.deleted) {
          console.log(`Skipping command "${name}"`);
          continue;
        }

        await applicationCommands.create({
          name,
          description,
          options,
        });

        console.log(`command registered ${name}`);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default registerCommands;
