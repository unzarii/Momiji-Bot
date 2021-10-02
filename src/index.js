// Init
const fs = require("fs");
const { Client, Collection, Intents} = require("discord.js");
// Allow environment variables to be accessed (allows the program to load the token via .env)
require("dotenv").config();
const client = new Client
(
  {
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_BANS,
      Intents.FLAGS.GUILD_INVITES,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.DIRECT_MESSAGES,
      Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
    ],
    allowedMentions:
    {
      parse:
      [
        "users"
      ],
      repliedUser: true
    },
    partials: ["CHANNEL"],
    presence:
    {
      status: "online",
      activities: [{ name: `awoo! | ${process.env.DEFAULTPREFIX}help` }]
    }
  }
);

// Global variables
client.config = require("../config.json");
client.commands = new Collection();

// For each event, load the functionality of the event and listen to it
fs.readdir("./src/events/", (err, files) =>
{
  files.forEach(file =>
  {
    if (!file.endsWith(".js"))
    {
      return;
    }

    const event_handler = require(`./events/${file}`);
    const event_name = file.split(".")[0];

    if (event_name === "ready")
    {
      client.once("ready", (...args) => event_handler(client, ...args));
    }
    else
    {
      client.on(event_name, (...args) => event_handler(client, ...args));
    }
  });
});

// For each command, load and store the functionality of the command
// TODO: Possible to check whether the command has all required fields such as permissions, otherwise discard command.
fs.readdir("./src/commands/", (err, files) =>
{
  files.forEach(file =>
  {
    if (!file.endsWith(".js"))
    {
      return;
    }

    const command_handler = require(`./commands/${file}`);
    const command_name = file.split(".")[0];
    client.commands.set(command_name, command_handler);
  });
});

// Automatically attempts to login via the token set via .env
client.login(process.env.TOKEN);