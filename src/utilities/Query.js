module.exports = (client, query, replacements) =>
{
  return new Promise((resolve, reject) =>
  {
    client.database.query(query, replacements, (error, result) =>
    {
      if (error)
      {
        console.error(error);
        reject("Query failed");
      }

      resolve(result);
    });
  });
};