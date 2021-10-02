const {Client, Permissions} = require("discord.js");
const GetRandomFace = require("../utilities/GetRandomFace.js");

module.exports =
{
  name: "headpat",
  description: "so comfy",
  execute(client, client_permissions, message, args)
  {
    if(client_permissions.has(Permissions.FLAGS.SEND_MESSAGES))
    {
      message.channel.send(`${GetRandomFace()}`).catch(console.error);
    }
  }
}