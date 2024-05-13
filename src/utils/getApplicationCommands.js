const getApplicationCommands = async (client, guildId) => {
  let applicationCommands = [];
  if (guildId) {
    
    const guild = await client.guilds.cache.get(guildId);
    applicationCommands = await guild.commands;
  } else {
    applicationCommands = await client.application.commands;
  }

  await applicationCommands.fetch();
  return applicationCommands;
}

export default getApplicationCommands;