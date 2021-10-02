const GetMemberFromArgument = require("../utilities/GetMemberFromArgument.js");
const seedrandom = require("seedrandom");

module.exports =
{
  name: "ship",
  description: "Ship two members",
  minimum_args: 2,
  permissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  execute(client, client_permissions, message, args)
  {
    // Crap but here we check whether the argument is a ping, and if it is we replace the argument with the member's name instead
    // Unintended side effect of the function: this makes using IDs valid as GetMemberFromArgument also handles those
    const member = GetMemberFromArgument(message, args[0]);
    const member1 = GetMemberFromArgument(message, args[1]);

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
    const seed = [now.toDateString(), lovers[0], lovers[1]].join(":");

    // Use seedrandom script to generate a seeded random, and transform into a "percentage"
    const rng = seedrandom(seed);
    const percentage = (Math.round(rng() * 100));

    message.channel.send("**" + args[0] + "** & **" + args[1] + "**: " + percentage + "% Match").catch(console.error);
  }
};