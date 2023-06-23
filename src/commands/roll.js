const seedrandom = require("seedrandom");

module.exports =
{
  usage: "roll <number>",
  description: "Returns a random number from zero to the number you input.",
  category: "useful",
  minimum_args: 1,
  permissions: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
  execute(client, client_permissions, message, args)
  {
    message.delete().catch(console.error);

    const number = args[0];
    const random = Math.round(Math.random() * number);
    
    message.channel.send(`${message.author} rolls ${random}.`).catch(console.error);
  }
};