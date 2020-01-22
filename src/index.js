//https://discordjs.guide/creating-your-bot/commands-with-user-input.html#basic-arguments
//and then check out the additional features stuff

const fs = require("fs");

const Discord = require("discord.js");
const client = new Discord.Client();

client.config = require("../config.json");
client.commands = new Discord.Collection();

//For each event, load the functionality of the event and listen to it
fs.readdir("./src/events/", (err, files) =>
{
  files.forEach(file =>
  {
    if(!file.endsWith(".js"))
    {
      return;
    }
    const event_handler = require(`./events/${file}`);
    const event_name = file.split(".")[0];
    client.on(event_name, (...args) => event_handler(Discord, client, ...args));
  });
});

//For each command, load and store the functionality of the command
fs.readdir("./src/commands/", (err, files) =>
{
  files.forEach(file =>
  {
    if(!file.endsWith(".js"))
    {
      return;
    }
    const command_handler = require(`./commands/${file}`); 
    const command_name = file.split(".")[0];
    client.commands.set(command_name, command_handler);
  });
});

client.login(client.config.token).catch(console.error);