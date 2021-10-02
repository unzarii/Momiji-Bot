const GetRandomFace = require("../utilities/GetRandomFace.js");

module.exports =
{
  usage: "headpat",
  description: "So comfy.",
  category: "fun",
  minimum_args: 0,
  permissions: ["SEND_MESSAGES"],
  execute(client, client_permissions, message)
  {
    message.channel.send(`${GetRandomFace()}`).catch(console.error);
  }
};