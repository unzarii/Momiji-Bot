module.exports =
{
  name: "say",
  description: "I'll repeat after you",
  execute(client, client_permissions, message, args, Discord)
  {
    if(client_permissions.has("SEND_MESSAGES"))
    {
      if(args.length !== 0)
      {
        const output = args.join(" ");

        if(client_permissions.has("MANAGE_MESSAGES"))
        {
          message.delete().catch(console.error);;
        }

        message.channel.send(output).catch(console.error);
      }
      else
      {
        message.channel.send("I can't say nothing!! (｡•́︿•̀｡)").catch(console.error);
      }
    }
  }
}