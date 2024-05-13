import path from 'path';
import { getAllFiles } from './getAllFiles.js';


const getLocalCommands = async (exceptions = []) => {
  let localCommands = [];

  const commandCategories = getAllFiles(path.join(import.meta.dirname, '..', 'commands'), true);
  
  for (const commandCategory of commandCategories) {
    const commandFiles = getAllFiles(commandCategory);
    for (const commandFile of commandFiles) {
      const commandObject = await import(commandFile);
      
      if (exceptions.includes(commandObject.default.name)) continue;

      localCommands.push(commandObject);
    }
  }
  
  return localCommands;
};


export default getLocalCommands;
