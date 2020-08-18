module.exports =
{
  name: "awoo",
  description: "I'll awoo back at you",
  min_arguments: 0,
  max_arguments: 0,
  execute(client, client_permissions, message, args)
  {
    if(client_permissions.has("SEND_MESSAGES"))
    {
      message.channel.send("awoo desu").catch(console.error);;
    }
  }
}