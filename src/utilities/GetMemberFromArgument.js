module.exports = function(message, arg)
{
  // TODO: Could improve this with regex but don't need or want to really.
  // Takes either a ping or an id

  // If the argument is a mention, convert it to an ID
  if (arg.startsWith("<@") && arg.endsWith(">"))
  {
    arg = arg.slice(2, -1);

    // If nickname /shrug
    if (arg.startsWith("!"))
    {
      arg = arg.slice(1);
    }
  }
  else
  {
      return false;
  }

  // Return the attempt to turn the ID into a member
  return message.guild.members.cache.get(arg);
};