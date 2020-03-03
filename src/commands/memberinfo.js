const moment = require("moment");

module.exports =
{
  name: "memberinfo",
  description: "Display information about a member",
  execute(client, client_permissions, message, args, Discord)
  {
    if(client_permissions.has("SEND_MESSAGES"))
    {
      if(client_permissions.has("EMBED_LINKS"))
      {
        let user = undefined;

        if(args.length === 1)
        {
          const input = args[0];
          const guild_member = message.guild.member(input);
          const mention = message.mentions.members.first();

          //TODO: SOMEDAY change this to be able to view ANY discord member; this requires this file to be completely promise-ified probably
          //HOWEVER I SPENT AN HOUR TRYING TO FIGURE OUT THIS PROMISE STUFF AND I JUST COULDNT GET IT TO WORK AAAA
          if(guild_member) //If the input is a valid user ID
          {
            user = guild_member.user;
          }
          else if(mention) //If the input is a valid user mention
          {
            user = mention.user;
          }
        }
        else if(args.length === 0)
        {
          user = message.author;
        }
        else
        {
          message.channel.send("Incorrect number of arguments!! (｡•́︿•̀｡)").catch(console.error);
          return;
        }

        //Calculate the age of the user
        const current_date = moment(new Date());
        let created_date = moment(user.createdAt);
        const intervals = ["years","months","days"];
        let user_age_string = [];

        //Find the difference between the two dates per interval, and then add it to createdDate so on the next pass there is no difference in that interval
        //This isolates the next interval (which won't include the previous interval in its diff)
        for(let i = 0; i < intervals.length; i++)
        {
          let diff = current_date.diff(created_date, intervals[i]);
          created_date.add(diff, intervals[i]);

          //Build the array that will become the resulting string
          user_age_string.push(diff + " " + intervals[i]);
        }

        user_age_string = user_age_string.join(", ");

        //Construct and send the user info embed
        const user_info = new Discord.RichEmbed()
          .setColor(0xe92134)
          .setTitle(user.tag)
          .setThumbnail(user.displayAvatarURL)
          .addField("Creation Date:", user.createdAt.toUTCString(), false)
          .addField("Account Age:", user_age_string, false)
          .addField("User ID:", user.id, false)

        message.channel.send(user_info).catch(console.error);
      }
      else
      {
        message.channel.send("PLEASE GIVE THIS BOT THE 'EMBED LINKS' PERMISSION!").catch(console.error);
      }
    }
  }
}