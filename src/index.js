const fs = require("node:fs");
const path = require("node:path");

const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const config = require("../config.json");

// TODO: More of a pm2 thing but this should NOT try to login if it does not have an internet connection otherwise it will crash
// TODO: There is the likelihood that I need to expand the intents.
// TODO: I imagine this is where I'll set my presence again, unless something changed somewhere.
// TODO: Handle missing permissions

// GatewayIntentBits is apparently necessary.
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// c is client
client.once(Events.ClientReady, c =>
{
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.Error, e =>
{
    console.log(e);
});

client.on(Events.Warn, w =>
{
    console.log(w);
});

// Login
// I am begging that this actually prevents the program from hanging in PM2
client.login(config.token).catch(error =>
{
    console.log(error);
    console.log("Exiting Momiji Zone. Goodbye.");
    process.exit;
});

// Store the commands
client.commands = new Collection();