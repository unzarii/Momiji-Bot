const { Permissions } = require("discord.js");
module.exports =
{
  name: "awoo",
  description: "I'll awoo back at you",
  minimum_args: 0,
  permissions: [Permissions.FLAGS.SEND_MESSAGES],
  execute(client, client_permissions, message)
  {
    // message.channel.send("awoo desu").catch(console.error);
    if (client_permissions.has(Permissions.FLAGS.SEND_MESSAGES))
    {
      message.channel.send("awoo desu").catch(console.error);
    }
  }
};