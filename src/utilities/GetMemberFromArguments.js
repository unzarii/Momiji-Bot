module.exports = function(message, args)
{
  let member = undefined;

  if(args.length === 0) //User is attempting to get their own information
  {
    member = message.member;
  }
  else //User is attempting to get the information of another member
  {
    //Assumes that the first argument is the user
    const input = args[0];

    //Attempt to get the user via either ID or mention
    const guild_member = message.guild.member(input);
    const mention = message.mentions.members.first();

    //Get the user based on the input. If this fails then undefined will be returned.
    if(guild_member) //If the input is a user ID
    {
      member = guild_member;
    }
    else if(mention) //If the input is a user mention
    {
      member = mention;
    }
  }

  return member;
}