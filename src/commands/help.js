const Discord = require('discord.js');
require('dotenv').config();

let prefix = process.env.DEFAULTPREFIX;

module.exports =
{
  name: "help",
  description: "Display a list of commands",
  execute(client, client_permissions, message, args)
  {
    if(client_permissions.has("SEND_MESSAGES"))
    {
      if(client_permissions.has("EMBED_LINKS"))
      {
        const help = new Discord.MessageEmbed()
          .setColor(0xe92134)
          .setTitle("Help")
          .setThumbnail(message.guild.iconURL({dynamic: true}))
          .addField("Useful Commands", `${prefix}help\n${prefix}ping\n${prefix}serverinfo\n${prefix}memberinfo`, false)
          .addField("Fun Commands", `${prefix}awoo\n${prefix}headpat\n${prefix}say <output>`, false)
          .addField("Other", "I also have a 0.025% chance of being *very mean* to you.", false)

        message.channel.send(help).catch(console.error);
      }
      else
      {
        message.channel.send("PLEASE GIVE THIS BOT THE 'EMBED LINKS' PERMISSION!").catch(console.error);
      }
    }
  }
}