const Query = require("../utilities/Query.js");
module.exports = (client, guild) =>
{
  // TODO: This is probably totally unnecessary as I need to check via messageCreate anyway.
  // Unreliable as it may not fire due to the bot being offline.

  // TODO: Turn this into a single statement?
  // Attempt to insert and if a record already exists then no duplicate it

  Query(client, "SELECT serverid FROM servers WHERE serverid = ?", guild.id).then(result =>
  {
    if (result.length < 1)
    {
      Query(client, "INSERT INTO servers SET serverid = ?", guild.id).then(res =>
      {
        console.log(`Added ${guild.name} (${guild.id}) to the database.`);
      });
    }
  });
};