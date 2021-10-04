module.exports = (client, query, replacements) =>
{
  return new Promise((resolve, reject) =>
  {
    // Escape just in case we get user input
    client.database.query(query, replacements, (error, result) =>
    {
      if (error)
      {
        reject("Query failed");
      }

      resolve(result);
    });
  });
};