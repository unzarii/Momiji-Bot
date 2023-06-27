const { Events } = require("discord.js");

module.exports =
{
    name: Events.ClientReady,
    once: true,
    async execute(client)
    {
        console.log(`Awoo! Logged in as ${client.user.tag}`);
        client.user.setActivity("awoo! | /help");
    },
};