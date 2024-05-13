import getAllMessages from '../../utils/getAllMessages.js';

const speadsheet = {
  name: 'speadsheet',
  description: 'gym spreadsheet',
  options: [],
  callback: async (client, interaction) => {
    const messages = await getAllMessages(client, interaction.channelId);
    // console.log(messages.map((msg) => msg.content)); // Print all messages
    const res = messages.map(msg => {
      const buffer = msg.content.split(',');
      const exersise = buffer.splice(0,1);

      for (let i in buffer)
        if (buffer[i] === '-') buffer[i] = buffer[i - 1];

      return {
        timestamp: msg.createdTimestamp,
        content: buffer,
        exersise: exersise[0]
      }
    })
    console.log(res)
  },
};

export default speadsheet;
