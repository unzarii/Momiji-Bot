//TODO: I don't know if I should be adding this as a property to the Discord client, or requiring it here
const faces = require("../utilities/faces.js");

module.exports =
{
	name: "headpat",
	description: "so comfy",
	execute(client, client_permissions, message, args, Discord)
	{
    if(client_permissions.has("SEND_MESSAGES"))
    {
      message.channel.send(`${faces.getRandom()}`).catch(console.error);
    }
	}
}