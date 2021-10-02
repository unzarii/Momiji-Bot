require("dotenv").config();

module.exports = (client) =>
{
  console.log("awooo~");

  const activity = `awoo! | ${process.env.DEFAULTPREFIX}help`;

  // Set the presence initially
  client.user.setPresence({ activities: [{ name: activity }] });
};

