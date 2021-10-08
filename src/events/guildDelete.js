const Query = require("../utilities/Query.js");
module.exports = (client, guild) =>
{
  // Unreliable as it may not fire due to the bot being offline.
  // Worth clearing records sooner than later though I feel.

  // TODO: Turn this into a single statement?
  // E.g. Attempt to delete and if you can't then whatever?

  Query(client, "SELECT serverid FROM servers WHERE serverid = ?", guild.id).then(result =>
  {
    if (result.length > 0)
    {
      Query(client, "DELETE FROM servers WHERE serverid = ?", guild.id).then(res =>
      {
        console.log(`Deleted ${guild.name} (${guild.id}) from the database.`);
      });
    }
  });
};