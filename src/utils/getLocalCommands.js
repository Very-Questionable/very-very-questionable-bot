import path from 'path';
import { getAllFiles } from './getAllFiles.js';

/**
 * Iterates through the commands folder and returns a list of pathnames to the folder
 * to import later
 * @param {*} exceptions 
 * @returns 
 */
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
