require('dotenv').config();
const GetRandomFace = require("../utilities/GetRandomFace.js");
const fs = require("fs");

module.exports = (client) =>
{
  console.log("awooo~");

  let activity = `awoo! | ${process.env.DEFAULTPREFIX}help`

  //Set the presence initially
  client.user.setPresence({ activity: { name: activity } }).catch(console.error);

  //Set the presence again every hour, just in case (as it seems to disappear after a while)
  setInterval(() => {
    client.user.setPresence({ activity: { name: activity } }).catch(console.error);
  }, 3600000);
}

