module.exports =
{
  name: "awoo",
  description: "I'll awoo back at you",
  minimum_args: 0,
  permissions: ["SEND_MESSAGES"],
  execute(client, client_permissions, message)
  {
    message.channel.send("awoo desu").catch(console.error);
  }
};