module.exports =
{
  name: "help",
  description: "Display a list of commands",
  execute(client, client_permissions, message, args, Discord)
  {
    if(client_permissions.has("SEND_MESSAGES"))
    {
      if(client_permissions.has("EMBED_LINKS"))
      {
        const help = new Discord.RichEmbed()
          .setColor(0xe92134)
          .setTitle("Help")
          .setThumbnail(message.guild.iconURL)
          .addField("Useful Commands", "-help\n-ping\n-serverinfo", false)
          .addField("Fun Commands", "-awoo\n-headpat\n-say <output>", false)
          .addField("Other", "I also have a 0.1% chance of being *very mean* to you.\nDad jokes enabled, for now.", false)

        message.channel.send(help).catch(console.error);
      }
      else
      {
        message.channel.send("PLEASE GIVE THIS BOT THE 'EMBED LINKS' PERMISSION!").catch(console.error);
      }
    }
  }
}