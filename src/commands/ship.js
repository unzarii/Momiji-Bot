const GetMemberFromArgument = require("../utilities/GetMemberFromArgument.js");
const seedrandom = require("seedrandom");

module.exports =
{
  usage: "ship <ping/id> <ping/id/phrase>",
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

    // Check that the first lover is an actual ping
    if (!member)
    {
        // TODO: Throw a proper error
        message.channel.send("Sorry! The first argument has to be a ping or an id!!! (｡•́︿•̀｡)").catch(console.error);
        return;
    }
    
    
    // Construct the second lover
    // Get every arg after the name and turn it into a single variable.
    let partner = "";
    args.forEach((arg, index) =>
    {
        if (index != 0)
        {
            // Check if the argument is a member
            // And determine whether to add the argument normally or add from said member's display name
            const loop_member = GetMemberFromArgument(message, arg);
            if (loop_member)
            {
                partner += loop_member.displayName;
            }
            else
            {
                partner += arg;
            }

            // Add a space if needed lol
            if (index != args.length - 1)
            {
                partner += " ";
            }
        }
    });

    // Before we add the lovers to the seed, sort them so that any combination of left/right will be the same
    const lovers = [member.displayName, partner];
    lovers.sort();

    // Create a seed with the current date, and the sorted names of the people being shipped.
    const now = new Date();
    const seed = [now.toDateString(), lovers[0], lovers[1], "ship"].join(":");

    // Use seedrandom script to generate a seeded random, and transform into a "percentage"
    const rng = seedrandom(seed);
    const percentage = (Math.round(rng() * 100));
    
    const output = "**" + member.displayName + "** & **" + partner + "**: " + percentage + "% Match";

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