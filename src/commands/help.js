const { MessageEmbed } = require("discord.js");

module.exports =
{
  usage: "help",
  description: "Displays a list of the commands.",
  category: "useful",
  minimum_args: 0,
  permissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  execute(client, client_permissions, message)
  {
    const help = new MessageEmbed()
      .setColor(0xe92134)
      .setTitle("Help")
      .setThumbnail(message.guild.iconURL({ dynamic: true }));

    if (client.useful_commands != "")
    {
      help.addField("Useful Commands", client.useful_commands);
    }
    if (client.fun_commands != "")
    {
      help.addField("Fun Commands", client.fun_commands);
    }

    help.addField("Other", "I also have a 0.025% chance of being *very mean* to you.");

    message.channel.send({ embeds: [help] }).catch(console.error);
  }
};