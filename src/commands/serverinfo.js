const { SlashCommandBuilder } = require("discord.js");

// TODO: Update with the original functionality.

module.exports =
{
    data: new SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("Provides information about the server."),
    async execute(interaction)
    {
        await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
    },
};