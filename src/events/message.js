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
  else //Not a command (in other words, you are entering the meme zone)
  {
    if(client_permissions.has("SEND_MESSAGES"))
    {
      //Prepare message.content
      message.content = message.content.toLowerCase();

      //Defeat losers
      if(message.mentions.users.has("238858432214597635"))
      {
        message.reply("https://i.imgur.com/iieDV6J.jpg");
      }

      //haha gay-inator
      let rand = Math.random() * 100;
      let normal_chance = 0.1; //0.1% chance

      //Has a 0.1% chance of responding with "haha gay"
      if((rand <= normal_chance))
      {
        if(message.author.id === client.config.owner)
        {
          message.reply(`I think that you're wonderful and extremely heterosexual ${faces.getRandom()}.`);
          console.log(`Complimented my lovely owner in ${message.guild.name} (${message.guild.id}).`);
        }
        else
        {
          message.reply("haha gay");
          console.log(`Bullied ${message.author.tag} in ${message.guild.name} (${message.guild.id}).`);
        }

        return;
      }

      //Dad Joke-inator (reuse chance variables)
      rand = Math.random() * 100;
      normal_chance = 50 //50% chance

      if((rand <= normal_chance))
      {
        if(message.content.startsWith("i'm") || message.content.startsWith("im") || message.content.startsWith("i am"))
        {
          let response_content = "";

          if(message.content.startsWith("i'm "))
          {
            response_content = message.content.substr(4);
          }
          else if(message.content.startsWith("im "))
          {
            response_content = message.content.substr(3);
          }
          else if(message.content.startsWith("i am "))
          {
            response_content = message.content.substr(5);
          }

          if(response_content.length != 0)
          {
            message.channel.send(`Hello ${response_content}, I'm Momiji ${faces.getRandom()}`);
          }
        }

        return;
      }

      //Responses
      if(message.content === "i am" || message.content === "im" || message.content === "i'm")
      {
        message.channel.send("gay").catch(console.error);
      }
      else if(message.content === "master chief, mind telling me what you're doing in that mcdonald's?")
      {
        message.channel.send("https://cdn.discordapp.com/attachments/250743808990380033/653291560590376961/IMG_20191207_180323.jpg").catch(console.error);
      }
      else if(message.content === "$dk")
      {
        message.channel.send("Donkey Kong").catch(console.error);
      }
      else if(message.content === "roman")
      {
        message.channel.send("https://cdn.discordapp.com/attachments/541428847053242400/663444242143903757/IMG_20200101_220133.jpg").catch(console.error);
      }
      else if(message.content === "ye :)")
      {
        message.channel.send("ye :)").catch(console.error);
      }
      else if(message.content === "ye (:")
      {
        message.channel.send("ye (:").catch(console.error);
      }
    }
  }
}