import path from 'path';
import { getAllFiles } from '../utils/getAllFiles.js';

const eventHandler = (client) => {
  const eventFolders = getAllFiles(path.join(import.meta.dirname, '..', 'events'), true);

  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a,b) => a > b);

    const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();

    client.on(eventName, async (arg) => {
      for (const eventFile of eventFiles) {
        const eventFunction = await import(eventFile);
        
        await eventFunction.default(client, arg);
      }
    });
  }
};

export default eventHandler;
