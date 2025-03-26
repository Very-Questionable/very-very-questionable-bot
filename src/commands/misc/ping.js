const command = {
  name: 'ping',
  description: 'pings',
  callback: async (_client, interaction) => {
    interaction.reply(
      'https://i.redd.it/5xoic5durzd81.png'
    );
  },
};

export default command;
