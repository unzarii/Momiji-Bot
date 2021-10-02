const GetRandomFace = require("../utilities/GetRandomFace.js");

module.exports =
{
  name: "headpat",
  description: "so comfy",
  minimum_args: 0,
  permissions: ["SEND_MESSAGES"],
  execute(client, client_permissions, message)
  {
    message.channel.send(`${GetRandomFace()}`).catch(console.error);
  }
};