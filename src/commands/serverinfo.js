const moment = require("moment");

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
        //Calculate the age of the server
        const currentDate = moment(new Date());
        let createdDate = moment(message.guild.createdAt);
        const intervals = ["years","months","days"];
        let serverAgeString = [];

        //Find the difference between the two dates per interval, and then add it to createdDate so on the next pass there is no difference in that interval
        //This isolates the next interval (which won't include the previous interval in its diff)
        for(let i = 0; i < intervals.length; i++)
        {
          let diff = currentDate.diff(createdDate, intervals[i]);
          createdDate.add(diff, intervals[i]);

          //Build the array that will become the resulting string
          serverAgeString.push(diff + " " + intervals[i]);
        }

        serverAgeString = serverAgeString.join(", ");

        //Construct and send the server info embed
        const server_info = new Discord.RichEmbed()
          .setColor(0xe92134)
          .setTitle("Server Information")
          .setThumbnail(message.guild.iconURL)
          .addField("Server Creation Date:", message.guild.createdAt.toUTCString(), false)
          .addField("Server Age:", serverAgeString, false)
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