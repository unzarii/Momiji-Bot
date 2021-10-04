module.exports = (client, guild) =>
{
  client.database.query("SELECT serverid FROM servers WHERE serverid = ?", guild.id, (error, result) =>
  {
    if (error)
    {
      console.error(error);
      return;
    }

    if (result.length > 0)
    {
      // If the server already exists, don't bother
      return;
    }

    client.database.query("INSERT INTO servers SET serverid = ?", guild.id, (err) =>
    {
      if (err)
      {
        console.error(err);
        return;
      }

      console.log(`Added ${guild.name} (${guild.id}) to the database.`);
    });
  });
};

