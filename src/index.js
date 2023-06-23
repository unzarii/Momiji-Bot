const { Client, Events, GatewayIntentBits } = require('discord.js');
const config = require('../config.json');

// GatewayIntentBits is apparently necessary.
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// c is client
client.once(Events.ClientReady, c =>
{
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Login
client.login(config.token);