const { Permissions } = require("discord.js");
module.exports =
{
  name: "ping",
  description: "pong",
  minimum_args: 0,
  execute(client, client_permissions, message)
  {
    if (client_permissions.has(Permissions.FLAGS.SEND_MESSAGES))
    {
      message.channel.send("pong").catch(console.error);
    }
  }
};