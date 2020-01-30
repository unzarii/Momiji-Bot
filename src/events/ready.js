//TODO: I don't know if I should be adding this as a property to the Discord client, or requiring it here
const faces = require("../utilities/faces.js");
const fs = require("fs");

module.exports = (Discord, client) =>
{
  console.log("awooo~");

  //Set the presence initially
  client.user.setPresence({ status: "playing", game: { name: "awooo | -help" } }).catch(console.error);;

  //Set it again every hour, just in case (as it seems to disappear after a while)
  setInterval(() => {
    client.user.setPresence({ status: "playing", game: { name: "awooo | -help" } });
  }, 3600000);

  //Remind the stupid admin to bump his bots every 4 hours
  setInterval(() => {
    client.channels.get(client.config.awooo_bump).send(`Don't forget to bump the bots ${faces.getRandom()}`).catch(console.error);
    client.channels.get(client.config.sm_bump).send(`Don't forget to bump the bots ${faces.getRandom()}`).catch(console.error);
    client.channels.get(client.config.d_bump).send(`Don't forget to bump the bots ${faces.getRandom()}`).catch(console.error);
  }, 14400000);
}