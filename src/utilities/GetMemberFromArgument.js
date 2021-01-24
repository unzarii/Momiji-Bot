module.exports = function(message, arg)
{
  //TODO: Could improve this with regex but don't need or want to really.

  //If the argument is a mention, convert it to an ID
  if(arg.startsWith("<@") && arg.endsWith(">"))
  {
    arg = arg.slice(2, -1);

    if(arg.startsWith("!")) //If nickname /shrug
    {
      arg = arg.slice(1);
    }
  }

  //Return the attempt to turn the ID into a member
  return message.guild.member(arg); //hope
}