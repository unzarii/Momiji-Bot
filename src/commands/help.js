const { MessageEmbed } = require("discord.js");
require("dotenv").config();

const prefix = process.env.DEFAULTPREFIX;

// TODO: make this dynamic

module.exports =
{
  name: "help",
  description: "Display a list of commands",
  minimum_args: 0,
  permissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  execute(client, client_permissions, message)
  {
    const help = new MessageEmbed()
      .setColor(0xe92134)
      .setTitle("Help")
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .addField("Useful Commands", `${prefix}help\n${prefix}ping\n${prefix}serverinfo\n${prefix}memberinfo <member (optional)>`, false)
      .addField("Fun Commands", `${prefix}awoo\n${prefix}headpat\n${prefix}say <output>\n${prefix}ship <argument 1> <argument 2>`, false)
      .addField("Other", "I also have a 0.025% chance of being *very mean* to you.", false);

    message.channel.send({ embeds: [help] }).catch(console.error);
  }
};