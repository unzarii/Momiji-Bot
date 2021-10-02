require('dotenv').config();
const GetRandomFace = require("../utilities/GetRandomFace.js");
const fs = require("fs");

module.exports = (client) =>
{
  console.log("awooo~");

  let activity = `awoo! | ${process.env.DEFAULTPREFIX}help`

  //Set the presence initially
  client.user.setPresence({ activities: [{ name: activity }] });
}

