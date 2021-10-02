module.exports =
{
  name: "ping",
  description: "pong",
  minimum_args: 0,
  permissions: ["SEND_MESSAGES"],
  execute(client, client_permissions, message)
  {
    message.channel.send("pong").catch(console.error);
  }
};