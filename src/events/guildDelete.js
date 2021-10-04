module.exports = (client, guild) =>
{
  client.database.query("SELECT serverid FROM servers WHERE serverid = ?", guild.id, (error, result) =>
  {
    if (error)
    {
      console.error(error);
      return;
    }

    if (result.length < 1)
    {
      // If there are no results, don't bother.
      return;
    }

    client.database.query("DELETE FROM servers WHERE serverid = ?", guild.id, (err) =>
    {
      if (err)
      {
        console.error(err);
        return;
      }

      console.log(`Deleted ${guild.name} (${guild.id}) from the database.`);
    });
  });
};
