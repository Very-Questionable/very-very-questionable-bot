// function to obtain every message in a channel: stack overflow
const getAllMessages = async (client, channelId) => {
  const channel = client.channels.cache.get(channelId);
  let messages = [];

  // Create message pointer
  let message = await channel.messages
    .fetch({ limit: 1 })
    .then((messagePage) => (messagePage.size === 1 ? messagePage.at(0) : null));
  messages.push(message);
  while (message) {
    await channel.messages.fetch({ limit: 100, before: message.id }).then((messagePage) => {
      messagePage.forEach((msg) => messages.push(msg));

      // Update our message pointer to be the last message on the page of messages
      message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
    });
  }

  return messages;
};

export default getAllMessages;
