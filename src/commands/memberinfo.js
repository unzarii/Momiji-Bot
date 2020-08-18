const Discord = require('discord.js');
const GetMemberFromArguments = require("../utilities/GetMemberFromArguments.js");
const CalculateDurationBetweenDates = require("../utilities/CalculateDurationBetweenDates");

module.exports =
{
  name: "memberinfo",
  description: "Display information about a member",
  min_arguments: 0,
  max_arguments: 1,
  execute(client, client_permissions, message, args)
  {
    if(client_permissions.has("SEND_MESSAGES"))
    {
      if(client_permissions.has("EMBED_LINKS"))
      {
        let member = GetMemberFromArguments(message, args) //This requires either 0 arguments or the 1st argument to be the member

        //If the member could not be resolved
        if(member === undefined)
        {
          message.channel.send("Member not found!! (｡•́︿•̀｡)").catch(console.error);
          return;
        }

        member_age_string = CalculateDurationBetweenDates(new Date(), member.user.createdAt);
        member_join_string = CalculateDurationBetweenDates(new Date(), member.joinedAt);

        //Construct and send the member info embed
        const member_info = new Discord.MessageEmbed()
          .setColor(0xe92134)
          .setTitle(member.user.tag)
          .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
          .addField("Joined At:", member.joinedAt.toUTCString(), false)
          .addField("Member Length:", member_join_string, false)
          .addField("Created At:", member.user.createdAt.toUTCString(), false)
          .addField("Account Age:", member_age_string, false)
          .addField("ID:", member.id, false)

        message.channel.send(member_info).catch(console.error);
      }
      else
      {
        message.channel.send("PLEASE GIVE THIS BOT THE 'EMBED LINKS' PERMISSION!").catch(console.error);
      }
    }
  }
}

//TODO: Remember me lol
        /*if(args.length > 1)
        {
          message.channel.send("Incorrect number of arguments!! (｡•́︿•̀｡)").catch(console.error);
          return;
        }*/