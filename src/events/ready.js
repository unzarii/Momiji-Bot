const submitQuery = require("../utilities/SubmitQuery.js");

module.exports = (client) =>
{
  console.log("awooo~");

  // Get every server the bot is in
  let guilds = [];
  client.guilds.cache.forEach(guild =>
  {
    guilds.push(guild.id);
  });
  console.log("Guilds the bot is in");
  console.log(guilds);

  // ----------- Submit Query -----------
  submitQuery(client, "SELECT serverid FROM servers WHERE serverid IN (?)", [guilds]).then(result =>
  {
    // Collect every server that is currently in the database
    const database_guilds = [];
    result.forEach((row) =>
    {
      database_guilds.push(row.serverid);
    });
    console.log("Guilds that are in the database");
    console.log(database_guilds);

    // Deduct which guilds are not in the database
    guilds = guilds.filter(item => !database_guilds.includes(item));
    console.log("Guilds that are not in the database");
    console.log(guilds);

    guilds.forEach(guild =>
    {
      // Add guild to database
      submitQuery(client, "INSERT INTO servers SET serverid = ?", guild);
      console.log(`Added ${guild} to database`);
    });
  });
};