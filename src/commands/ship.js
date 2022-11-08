const GetMemberFromArgument = require("../utilities/GetMemberFromArgument.js");
const seedrandom = require("seedrandom");

module.exports =
{
  usage: "ship <lover 1> <lover 2>",
  description: "Ships two members ♥",
  category: "fun",
  minimum_args: 2,
  permissions: ["SEND_MESSAGES"],
  execute(client, client_permissions, message, args)
  {
    // Crap but here we check whether the argument is a ping, and if it is we replace the argument with the member's name instead
    // Unintended side effect of the function: this makes using IDs valid as GetMemberFromArgument also handles those
    const member = GetMemberFromArgument(message, args[0]);
    const member1 = GetMemberFromArgument(message, args[1]);

    //It probably is disgusting that I'm reassigning args like this but I don't need it anymore sooo
    if (member)
    {
      args[0] = member.displayName;
    }

    if (member1)
    {
      args[1] = member1.displayName;
    }

    // Before we add the arguments to the seed, sort them so that any combination of left/right will be the same
    const lovers = [args[0], args[1]];
    lovers.sort();

    // Create a seed with the current date, and the sorted names of the people being shipped.
    const now = new Date();
    const seed = [now.toDateString(), lovers[0], lovers[1], "ship"].join(":");

    // Use seedrandom script to generate a seeded random, and transform into a "percentage"
    const rng = seedrandom(seed);
    const percentage = (Math.round(rng() * 100));
    
    const output = "**" + args[0] + "** & **" + args[1] + "**: " + percentage + "% Match";

    if (output.length > 2000)
    {
        message.channel.send("fuck off lmao").catch(console.error);
    }
    else
    {
        message.channel.send(output).catch(console.error);
    }
  }
};