const { Client, Collection, Intents } = require("discord.js");
const { createPool } = require ("mysql");

require("dotenv").config();
const prefix = process.env.DEFAULTPREFIX;

const fs = require("fs");

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
      activities: [{ name: `awoo! | ${prefix}help` }]
    }
  }
);

// Global variables
client.config = require("../config.json");
client.commands = new Collection();

// 10 is total arbitrary
client.database = createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

// TODO: Check if the database is set up correctly
// Is every table we need there?
// For each table, do they have the correct columns?

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


// TODO: Possible to check whether the command has all required fields such as permissions, otherwise discard command.
fs.readdir("./src/commands/", (err, files) =>
{
  // For each command, load and store the functionality of the command
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

  // Generate help command strings
  client.useful_commands = "";
  client.fun_commands = "";

  try
  {
    client.commands.forEach(command =>
    {
      if (command.category === "useful")
      {
        client.useful_commands += "**" + prefix + command.usage + "**\n*" + command.description + "*\n";
      }
      else if (command.category === "fun")
      {
        client.fun_commands += "**" + prefix + command.usage + "**\n*" + command.description + "*\n";
      }
    });
  }
  catch (error)
  {
    console.log(error);
  }
});

// Automatically attempts to login via the token set via .env
client.login(process.env.TOKEN);