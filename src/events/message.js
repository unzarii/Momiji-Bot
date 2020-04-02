//TODO: I don't know if I should be adding this as a property to the Discord client, or requiring it here
const faces = require("../utilities/faces.js");
const prefix = "-";

module.exports = (Discord, client, message) =>
{
  //Ignore messages from bots
  if(message.author.bot === true)
  {
    //TODO: Maybe add a meme "thank you bot-san" thing here
    return;
  }

  //Check whether messages are in a guild or DMs
  if(message.guild === null)
  {
    message.reply("https://i.imgur.com/iieDV6J.jpg").catch(console.error);
    //Sneaky
    console.log(`DM Received from ${message.author.tag}: "${message.content}".`);
    return;
  }

  if(message.guild.available === false)
  {
    console.log("Server Outage");
    return;
  }

  //If the message author is somehow no longer a member of the server (it was somehow null once)
  if(message.member === null)
  {
    return;
  }

  //Get and store the overall permissions that the bot has in the channel, taking into account overrides
  const client_permissions = message.channel.memberPermissions(message.member.guild.me);

  //Is the message a command?
  if(message.content.startsWith(prefix))
  {
    //Split the message into command and arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    //If the command is invalid then stop
    if(!client.commands.has(command))
    {
      if(client_permissions.has("SEND_MESSAGES"))
      {
        message.channel.send(`No such command exists! Try ${prefix}help.`).catch(console.error);
      }
      return;
    }

    //Attempt to execute the command, and pass in the message and bot permissions for that channel
    try
    {
      console.log(`Executing command: "${command}".`);
      client.commands.get(command).execute(client, client_permissions, message, args, Discord);
    }
    catch (error)
    {
      console.log(`Failed to execute command: "${command}".`);
      console.error(error);

      if(client_permissions.has("SEND_MESSAGES"))
      {
        message.channel.send(`OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!`).catch(console.error);
      }
    }
  }
  else //Not a command (in other words, you are entering the DISGUSTING meme zone)
  {
    if(client_permissions.has("SEND_MESSAGES"))
    {
      //Prepare message.content for case insensitive checks
      const message_lowercase = message.content.toLowerCase();

      //Defeat losers
      if(message.mentions.users.has("238858432214597635"))
      {
        message.reply("https://i.imgur.com/iieDV6J.jpg").catch(console.error);;
        return;
      }

      const im_array = ["i'm", "im", "i am"];

      //TODO: Fix this mess. Or don't, as this is only temporary.
      if(im_array.includes(message_lowercase))
      {
        message.channel.send("gay").catch(console.error);
        return;
      }
      else if(message_lowercase === "master chief, mind telling me what you're doing in that mcdonald's?")
      {
        message.channel.send("https://cdn.discordapp.com/attachments/250743808990380033/653291560590376961/IMG_20191207_180323.jpg").catch(console.error);
        return;
      }
      else if(message_lowercase === "$dk")
      {
        message.channel.send("Donkey Kong").catch(console.error);
        return;
      }
      else if(message_lowercase === "roman")
      {
        message.channel.send("https://cdn.discordapp.com/attachments/541428847053242400/663444242143903757/IMG_20200101_220133.jpg").catch(console.error);
        return;
      }
      else if(message_lowercase === "ye :)")
      {
        message.channel.send("ye :)").catch(console.error);
        return;
      }
      else if(message_lowercase === "ye (:")
      {
        message.channel.send("ye (:").catch(console.error);
        return;
      }
      else if(message_lowercase === "hashbrown" || message_lowercase === "hash brown")
      {
        message.channel.send("https://cdn.discordapp.com/attachments/541428847053242400/684164702695325711/03085543-87de-47ab-a4eb-58e7e39d022e-2060x1236.png").catch(console.error);
        return;
      }

      //Haha Gay-inator (these variables will be re-used for the Dad Joke-inator)
      let rand = Math.random() * 100;
      let normal_chance = 0.1; //0.1% chance

      //Has a 0.1% chance of responding with "haha gay"
      if((rand <= normal_chance))
      {
        if(message.author.id === client.config.owner)
        {
          message.reply(`I think that you're wonderful and extremely heterosexual ${faces.getRandom()}.`).catch(console.error);
          console.log(`Complimented my lovely owner in ${message.guild.name} (${message.guild.id}).`);
        }
        else
        {
          message.reply("haha gay").catch(console.error);
          console.log(`Bullied ${message.author.tag} in ${message.guild.name} (${message.guild.id}).`);
        }

        return;
      }
    }
  }
}