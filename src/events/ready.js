const { Events } = require("discord.js");

module.exports =
{
    name: Events.ClientReady,
    once: true,
    execute(client)
    {
        console.log(`Awoo! Logged in as ${client.user.tag}`);
        client.user.setActivity("awoo! | now with slash commands!");
    },
};