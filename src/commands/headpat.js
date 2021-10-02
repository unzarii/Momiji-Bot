const { Permissions } = require("discord.js");
const GetRandomFace = require("../utilities/GetRandomFace.js");

module.exports =
{
  name: "headpat",
  description: "so comfy",
  minimum_args: 0,
  execute(client, client_permissions, message)
  {
    if (client_permissions.has(Permissions.FLAGS.SEND_MESSAGES))
    {
      message.channel.send(`${GetRandomFace()}`).catch(console.error);
    }
  }
};