module.exports =
{
  name: "awoo",
  description: "I'll awoo back at you",
  execute(client, client_permissions, message, args)
  {
    if(client_permissions.has("SEND_MESSAGES"))
    {
      message.channel.send("awoo desu").catch(console.error);;
    }
  }
}