module.exports =
{
  usage: "say <output>",
  description: "Sends a message copying what you said.",
  category: "fun",
  minimum_args: 1,
  permissions: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
  execute(client, client_permissions, message, args)
  {
    const output = args.join(" ");
    message.delete().catch(console.error);

    message.channel.send(output).catch(console.error);
  }
};