const GetMemberFromArgument = require("../utilities/GetMemberFromArgument.js");
const seedrandom = require("seedrandom");

module.exports =
{
  usage: "diagnose <person> <condition>",
  description: "Diagnose someone for a condition!",
  category: "fun",
  minimum_args: 2,
  permissions: ["SEND_MESSAGES"],
  execute(client, client_permissions, message, args)
  {
    // Crap but here we check whether the argument is a ping, and if it is we replace the argument with the member's name instead
    // Unintended side effect of the function: this makes using IDs valid as GetMemberFromArgument also handles those
    const member = GetMemberFromArgument(message, args[0]);

    //It probably is disgusting that I'm reassigning args like this but I don't need it anymore sooo
    if (member)
    {
      args[0] = member.displayName;
    }

    // Create a seed with the current date, the name of the person being diagnosed, and the "cringe" string so that it doesn't somehow overlap with other commands.
    const now = new Date();
    const seed = [now.toDateString(), args[0], args[1], "cringe"].join(":");

    // Use seedrandom script to generate a seeded random, and transform into a "percentage"
    const rng = seedrandom(seed);
    const percentage = (Math.round(rng() * 100));
    
    // Build response
    let response = "I diagnose **" + args[0] + "** to have a **" + args[1] + "** level of: " + percentage + "%!";
    
    if (percentage > 80)
    {
        response += "\n /!\\ Critical levels of **" + args[1] + "** detected! /!\\"
    }
    
    message.channel.send(response).catch(console.error);
    
  }
};