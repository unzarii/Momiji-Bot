const { Permissions } = require("discord.js");
module.exports =
{
  name: "awoo",
  description: "I'll awoo back at you",
  execute(client, client_permissions, message)
  {
    if (client_permissions.has(Permissions.FLAGS.SEND_MESSAGES))
    {
      message.channel.send("awoo desu").catch(console.error);
    }
  }
};