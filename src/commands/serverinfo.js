const Discord = require('discord.js');
const CalculateDurationBetweenDates = require("../utilities/CalculateDurationBetweenDates");

module.exports =
{
  name: "serverinfo",
  description: "Display information about the server",
  min_arguments: 0,
  max_arguments: 0,
  execute(client, client_permissions, message, args)
  {
    if(client_permissions.has("SEND_MESSAGES"))
    {
      if(client_permissions.has("EMBED_LINKS"))
      {
        server_age_string = CalculateDurationBetweenDates(new Date(), message.guild.createdAt);

        //Calculate how many channels of each type that there are
        let text_channels = 0;
        let voice_channels = 0;

        message.guild.channels.cache.forEach(channel =>
        {
          switch(channel.type)
          {
            case "text":
              text_channels++;
              break;
            case "voice":
              voice_channels++;
              break;
            default:
          }
        });

        //Construct and send the server info embed
        const server_info = new Discord.MessageEmbed()
          .setColor(0xe92134)
          .setTitle("Server Information")
          .setThumbnail(message.guild.iconURL({dynamic: true}))
          .addField("Server Creation Date:", message.guild.createdAt.toUTCString(), false)
          .addField("Server Age:", server_age_string, false)
          .addField("Text Channels:", text_channels, true)
          .addField("Voice Channels:", voice_channels, true)
          .addField("Member Count:", message.guild.memberCount, false)
          .addField("Roles:", message.guild.roles.cache.size, false)
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