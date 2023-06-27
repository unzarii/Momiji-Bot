const { SlashCommandBuilder } = require("discord.js");

module.exports =
{
    cooldown: 1,
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Ping?")
        .setDMPermission(false),
    async execute(interaction)
    {
        await interaction.reply("Pong!");
    },
};