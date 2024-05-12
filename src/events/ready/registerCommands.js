import testGuild from '../../../config.json' with { type: "json" }
import getLocalCommands from '../../utils/getLocalCommands.js';
import getApplicationCommands from '../../utils/getApplicationCommands.js';

const registerCommands = async (client) => {
  
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = getApplicationCommands(client, testGuild);
    
    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;
      const existingCommand = await applicationCommands.cache.find(
        (res) => res.name === name
      );

      if (existingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`deleted "${name}"`)
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export default registerCommands;