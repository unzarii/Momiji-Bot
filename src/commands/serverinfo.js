module.exports =
{
	name: "serverinfo",
	description: "Display information about the server",
	execute(client, client_permissions, message, args, Discord)
	{
		if(client_permissions.has("SEND_MESSAGES"))
    {
      if(client_permissions.has("EMBED_LINKS"))
      {
        const server_info = new Discord.RichEmbed()
          .setColor(0xe92134)
          .setTitle("Server Information")
          .setThumbnail(message.guild.iconURL)
          .addField("Server Creation Date:", message.guild.createdAt.toUTCString(), false)
          .addField("Roles:", message.guild.roles.size, true)
          .addField("Channels:", message.guild.channels.size, true)
          .addField("Member Count:", message.guild.memberCount, false)
          .addField("Region:", message.guild.region, false)
          .addField("Owner:", message.guild.owner, false)

        message.channel.send(server_info).catch(console.error);
      }
      else
      {
        message.channel.send("PLEASE GIVE THIS BOT THE 'EMBED LINKS' PERMISSION!").catch(console.error);
      }
    }
	}
}