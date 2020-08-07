const Discord = require('discord.js');
const moment = require("moment");

function CalculateDurationBetweenDates(start_date, end_date)
{
  const intervals = ["years","months","days"];
  let output_string = [];
  let s_date = moment(start_date);
  let e_date = moment(end_date);

  //Find the difference between the two dates per interval, and then add it to e_date so on the next pass there is no difference in that interval
  //This isolates the next interval (which won't include the previous interval in its diff)
  for(let i = 0; i < intervals.length; i++)
  {
    let diff = s_date.diff(e_date, intervals[i]);
    e_date.add(diff, intervals[i]);

    //Build the array that will become the resulting string
    output_string.push(diff + " " + intervals[i]);
  }

  output_string = output_string.join(", ");
  return output_string;
}

module.exports =
{
  name: "memberinfo",
  description: "Display information about a member",
  execute(client, client_permissions, message, args)
  {
    if(client_permissions.has("SEND_MESSAGES"))
    {
      if(client_permissions.has("EMBED_LINKS"))
      {
        let member = undefined;

        //Determine whether the user is getting the information of another member, or themselves
        if(args.length === 1) //User is attempting to get the information of another member
        {
          const input = args[0];
          const guild_member = message.guild.member(input);
          const mention = message.mentions.members.first();

          //Get the user based on the input
          if(guild_member) //If the input is a user ID
          {
            member = guild_member;
          }
          else if(mention) //If the input is a user mention
          {
            member = mention;
          }
          else //If the input is invalid
          {
            message.channel.send("Member not found!! (｡•́︿•̀｡)").catch(console.error);
            return;
          }
        }
        else if(args.length === 0) //User is attempting to get the information of themselves
        {
          member = message.member;
        }
        else
        {
          message.channel.send("Incorrect number of arguments!! (｡•́︿•̀｡)").catch(console.error);
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