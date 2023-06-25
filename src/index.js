const fs = require("node:fs");
const path = require("node:path");

const { Client, GatewayIntentBits, Collection } = require("discord.js");
const config = require("../config.json");

// TODO: There is the likelihood that I need to expand the intents.
// TODO: I imagine this is where I'll set my presence again, unless something changed somewhere.
// TODO: Handle missing permissions

// TODO: Wondering if I could do a async login loop that has a delay and that breaks out only when "ClientReady" says yes I'm ready!! via variable
// If unhandledrejection is being caught then it shouldn't crash like usual...? Even if it does initially fail to connect...?

// GatewayIntentBits is apparently necessary.
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
] });

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

// Instant loss
process.on("unhandledRejection", error =>
{
    console.log(error);

    process.exit(1);
});

// TODO: Fuck knows  how to handle if I cannot initially get a connection
client.login(config.token);