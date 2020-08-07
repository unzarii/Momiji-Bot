const Discord = require('discord.js');
const moment = require("moment");

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

          if(guild_member) //If the input is a user ID
          {
            member = guild_member.user;
          }
          else if(mention) //If the input is a user mention
          {
            member = mention.user;
          }
          else //If the input is invalid
          {
            message.channel.send("Member not found").catch(console.error);
            return;
          }
        }
        else if(args.length === 0) //User is attempting to get the information of themselves
        {
          member = message.author;
        }
        else
        {
          message.channel.send("Incorrect number of arguments!! (｡•́︿•̀｡)").catch(console.error);
          return;
        }

        //Calculate the age of the user
        const current_date = moment(new Date());
        let created_date = moment(member.createdAt);
        const intervals = ["years","months","days"];
        let member_age_string = [];

        //Find the difference between the two dates per interval, and then add it to createdDate so on the next pass there is no difference in that interval
        //This isolates the next interval (which won't include the previous interval in its diff)
        for(let i = 0; i < intervals.length; i++)
        {
          let diff = current_date.diff(created_date, intervals[i]);
          created_date.add(diff, intervals[i]);

          //Build the array that will become the resulting string
          member_age_string.push(diff + " " + intervals[i]);
        }

        member_age_string = member_age_string.join(", ");

        //Construct and send the member info embed
        const member_info = new Discord.MessageEmbed()
          .setColor(0xe92134)
          .setTitle(member.tag)
          .setThumbnail(member.displayAvatarURL({dynamic: true}))
          .addField("Creation Date:", member.createdAt.toUTCString(), false)
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