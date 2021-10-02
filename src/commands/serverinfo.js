const {MessageEmbed, Permissions} = require("discord.js");
const CalculateDurationBetweenDates = require("../utilities/CalculateDurationBetweenDates");

module.exports =
{
  name: "serverinfo",
  description: "Display information about the server",
  execute(client, client_permissions, message, args)
  {
    if(client_permissions.has(Permissions.FLAGS.SEND_MESSAGES))
    {
      if(client_permissions.has(Permissions.FLAGS.EMBED_LINKS))
      {
        server_age_string = CalculateDurationBetweenDates(new Date(), message.guild.createdAt);

        //Calculate how many channels of each type that there are
        let text_channels = 0;
        let voice_channels = 0;

        message.guild.channels.cache.forEach(channel =>
        {
          switch(channel.type)
          {
            case "GUILD_TEXT":
              text_channels++;
              break;
            case "GUILD_VOICE":
              voice_channels++;
              break;
            default:
          }
        });

        //Construct and send the server info embed
        const server_info = new MessageEmbed()
          .setColor(0xe92134)
          .setTitle("Server Information")
          .setThumbnail(message.guild.iconURL({dynamic: true}))
          .addField("Server Creation Date:", message.guild.createdAt.toUTCString(), false)
          .addField("Server Age:", server_age_string, false)
          .addField("Text Channels:", text_channels.toString(), true)
          .addField("Voice Channels:", voice_channels.toString(), true)
          .addField("Member Count:", message.guild.memberCount.toString(), false)
          .addField("Roles:", message.guild.roles.cache.size.toString(), false)
          .addField("Owner:", "<@" + message.guild.ownerId + ">", false)

        message.channel.send({embeds: [server_info]}).catch(console.error);
      }
      else
      {
        message.channel.send("PLEASE GIVE THIS BOT THE 'EMBED LINKS' PERMISSION!").catch(console.error);
      }
    }
  }
}