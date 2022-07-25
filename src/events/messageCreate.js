const { Permissions } = require("discord.js");
const GetRandomFace = require("../utilities/GetRandomFace.js");

module.exports = (client, message) =>
{
  if (message.author.bot === true)
  {
    return;
  }

  if (message.guild === null)
  {
    message.reply("https://i.imgur.com/iieDV6J.jpg").catch(console.error);
    console.log(`DM Received from ${message.author.tag}: "${message.content}".`);
    return;
  }

  if (message.guild.available === false)
  {
    console.log("Server Outage");
    return;
  }

  // If the message author is somehow no longer a member of the server (it was somehow null once)
  if (message.member === null)
  {
    return;
  }

  // Get and store the overall permissions that the bot has in the channel, taking into account overrides
  // So we can send messages / perform command permission checking
  const client_permissions = message.channel.permissionsFor(message.guild.me);

  const prefix = client.config.default_prefix;

  if (message.content.startsWith(prefix))
  {
    // Split the message into command and arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command))
    {
      if (client_permissions.has(Permissions.FLAGS.SEND_MESSAGES))
      {
        message.channel.send(`No such command exists! Try ${prefix}help.`).catch(console.error);
      }
      return;
    }

    try
    {
      // Check permissions
      const command_permissions = client.commands.get(command).permissions;

      if (!client_permissions.has(command_permissions))
      {
        throw `I'm missing some of these permissions: \`${command_permissions}\`! (｡•́︿•̀｡)`;
      }

      // Check arguments
      const min_args = client.commands.get(command).minimum_args;
      const actual_args = args.length;

      if (actual_args < min_args)
      {
        throw `Not enough arguments! I need at least ${min_args} (｡•́︿•̀｡)`;
      }

      // Execute command
      console.log(`${message.author.tag} executed command: "${command}".`);
      client.commands.get(command).execute(client, client_permissions, message, args);
    }
    catch (error)
    {
      if (client_permissions.has(Permissions.FLAGS.SEND_MESSAGES))
      {
        message.channel.send(error).catch(console.error);
      }
      console.log(error);

      return;
    }
  }
  else if (client_permissions.has(Permissions.FLAGS.SEND_MESSAGES))
  {
    // --------------------------------
    // ----------- Meme HELL ----------
    // --------------------------------

    // Prepare message.content for case insensitive checks
    const message_lowercase = message.content.toLowerCase();

    // Check to see if the author is a VIP. There is probably a better way of checking for this.
    let vip = false;

    for (const c_vip in client.config.vips)
    {
      if (message.author.id == client.config.vips[c_vip])
      {
        vip = true;
        break;
      }
    }

    // List of possible "I'm" permutations
    const im_array = ["i'm", "im", "i am"];

    // --------------------------------
    // ------ Auto-Response HELL ------
    // --------------------------------
    // Don't be mean to VIPs, okay?
    if (im_array.includes(message_lowercase) && !vip)
    {
      message.channel.send("stinky").catch(console.error);
      return;
    }
    else if (message_lowercase === "master chief, mind telling me what you're doing in that mcdonald's?")
    {
      message.channel.send("https://cdn.discordapp.com/attachments/250743808990380033/653291560590376961/IMG_20191207_180323.jpg").catch(console.error);
      return;
    }
    else if (message_lowercase === "roman")
    {
      message.channel.send("https://cdn.discordapp.com/attachments/541428847053242400/663444242143903757/IMG_20200101_220133.jpg").catch(console.error);
      return;
    }
    else if (message_lowercase === "ye :)")
    {
      message.channel.send("ye :)").catch(console.error);
      return;
    }
    else if (message_lowercase === "ye (:")
    {
      message.channel.send("ye (:").catch(console.error);
      return;
    }
    else if (message_lowercase === "hashbrown" || message_lowercase === "hash brown")
    {
      message.channel.send("https://cdn.discordapp.com/attachments/541428847053242400/684164702695325711/03085543-87de-47ab-a4eb-58e7e39d022e-2060x1236.png").catch(console.error);
      return;
    }

    // Haha Stinky-inator
    const rand = Math.random() * 100;
    // Very rare
    const normal_chance = 0.025;

    // Has a 0.025% chance of responding with "haha stinky" unless the bot is the owner or a VIP
    if ((rand <= normal_chance))
    {
      if (message.author.id === client.config.owner)
      {
        message.reply(`I think that you're wonderful ${GetRandomFace()}.`).catch(console.error);
        console.log(`Complimented my lovely owner in ${message.guild.name} (${message.guild.id}).`);
      }
      else if (!vip)
      {
        message.reply("haha stinky").catch(console.error);
        console.log(`Bullied ${message.author.tag} in ${message.guild.name} (${message.guild.id}).`);
      }

      return;
    }
  }
};