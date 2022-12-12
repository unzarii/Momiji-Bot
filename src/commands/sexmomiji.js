module.exports =
{
  usage: "sexmomiji",
  description: "SEX SEX SEX SEX SEX",
  category: "fun",
  minimum_args: 0,
  permissions: ["SEND_MESSAGES"],
  execute(client, client_permissions, message)
  {
    message.channel.send("ha ha ha, *you knooooow*, ha ha ha the funny").catch(console.error);
  }
};