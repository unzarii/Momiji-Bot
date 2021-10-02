const { MessageEmbed } = require("discord.js");
const GetMemberFromArgument = require("../utilities/GetMemberFromArgument.js");
const CalculateDurationBetweenDates = require("../utilities/CalculateDurationBetweenDates");

module.exports =
{
  usage: "memberinfo <(optional) member>",
  description: "Displays information about a member.",
  category: "useful",
  minimum_args: 0,
  permissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  execute(client, client_permissions, message, args)
  {
    let member;

    // User is attempting to get their own information
    if (args.length === 0)
    {
      member = message.member;
    }
    else
    {
      // User is attempting to get the information of another member
      member = GetMemberFromArgument(message, args[0]);
    }

    // If the member could not be resolved
    if (!member)
    {
      message.channel.send("Member not found!! (｡•́︿•̀｡)").catch(console.error);
      return;
    }

    const member_age_string = CalculateDurationBetweenDates(new Date(), member.user.createdAt);
    const member_join_string = CalculateDurationBetweenDates(new Date(), member.joinedAt);

    // Construct and send the member info embed
    const member_info = new MessageEmbed()
      .setColor(0xe92134)
      .setTitle(member.user.tag)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .addField("Joined At:", member.joinedAt.toUTCString(), false)
      .addField("Member Length:", member_join_string, false)
      .addField("Created At:", member.user.createdAt.toUTCString(), false)
      .addField("Account Age:", member_age_string, false)
      .addField("ID:", member.id, false);

    message.channel.send({ embeds:[member_info] }).catch(console.error);
  }
};