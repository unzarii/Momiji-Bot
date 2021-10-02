const {Client, Permissions} = require("discord.js");
module.exports =
{
  name: "ping",
  description: "pong",
  execute(client, client_permissions, message, args)
  {
    if(client_permissions.has(Permissions.FLAGS.SEND_MESSAGES))
    {
      message.channel.send("pong").catch(console.error);
    }
  }
}