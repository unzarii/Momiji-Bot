module.exports = function(client, query, replacement)
{
  return new Promise((resolve, reject) =>
  {
    // This is entirely assuming that there is a connection
    // And there should be, considering it is configured in index.js
    // Could I add sanity checking? Probably.
    // Will I right now? No.

    client.database.getConnection((err, connection) =>
    {
      if (err)
      {
        reject("Failed to connect");
      }

      connection.query(query, replacement, (error, result) =>
      {
        const r = result;

        connection.release();
        if (error)
        {
          reject("Failed to release");
        }

        resolve(r);
      });
    });
  });
};