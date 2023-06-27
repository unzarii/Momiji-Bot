const fs = require("node:fs");
const path = require("node:path");

const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const config = require("../config.json");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages],
    partials: [
        Partials.Message,
        Partials.Channel,
    ],
});

// This is how we access sequelize (which is now connected via this) and our tables/models
// It executes the file then passes the tables/models through.

//  Add the tables as properties to the client
// I am sure there is a better way to do this but I've bled out of my eyes
client.db = require("./dbObjects");

// COMMAND HANDLER
client.commands = new Collection();
client.cooldowns = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

// For every folder in the commands folder
for (const folder of commandFolders)
{
    // Read in the the commands within said folder
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

    // For every command, add it to the client.
    for (const file of commandFiles)
    {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ("data" in command && "execute" in command)
        {
            client.commands.set(command.data.name, command);
        }
        else
        {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// EVENT HANDLER
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

for (const file of eventFiles)
{
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if (event.once)
    {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else
    {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// This is the "uh oh bad shit happened just give up" section of my code
// TODO: Figure out some way of retrying
// For now, as long as things are perfect, nothing bad should happen UwU

process.on("unhandledRejection", error =>
{
    console.log(error);

    process.exit(1);
});

client.login(config.token)
    .catch(error =>
    {
        console.error("Couldn't login!", error);
        process.exit(1);
    });

