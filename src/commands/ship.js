const Discord = require("discord.js");
const GetMemberFromArgument = require("../utilities/GetMemberFromArgument.js");
const seedrandom = require("seedrandom");

module.exports =
{
  name: "ship",
  description: "Ship two members",
  execute(client, client_permissions, message, args)
  {
    if(client_permissions.has("SEND_MESSAGES"))
    {
      if(client_permissions.has("EMBED_LINKS"))
      {
        if(args.length !== 2) //There must be two arguments (please change this to be handled by the event lol)
        {
          message.channel.send("Wrong number of people to ship!").catch(console.error);
          return;
        }

        //Before we add the arguments to the seed, sort them so that any combination of left/right will be the same
        var lovers = [args[0], args[1]];
        lovers.sort();

        // Create a seed with the current date, and the sorted names of the people being shipped.
        const now = new Date();
        const seed = [now.toDateString(), lovers[0], lovers[1]].join(":");

        // Use seedrandom script to generate a seeded random, and transform into a "percentage"
        const rng = seedrandom(seed);
        const percentage = (rng() * 100).toPrecision(2);

        // Crap but here we check whether the argument is a ping, and if it is we replace the argument with the member's name instead
        // Unintended side effect of the function: this makes using IDs valid as GetMemberFromArgument also handles those
        const member = GetMemberFromArgument(message, args[0]);
        const member1 = GetMemberFromArgument(message, args[1]);

        if(member)
        {
          args[0] = member.displayName;
        }

        if(member1)
        {
          args[1] = member1.displayName;
        }

        message.channel.send("**" + args[0] + "** & **" + args[1] + "**: " + percentage + "% Match").catch(console.error);
      }
    }
  }
}