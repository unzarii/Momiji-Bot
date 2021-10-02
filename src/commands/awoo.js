module.exports =
{
  usage: "awoo",
  description: "I'll awoo back at you.",
  category: "fun",
  minimum_args: 0,
  permissions: ["SEND_MESSAGES"],
  execute(client, client_permissions, message)
  {
    message.channel.send("awoo desu").catch(console.error);
  }
};