const { SlashCommandBuilder } = require("discord.js");

module.exports =
{
    data: new SlashCommandBuilder()
        .setName("awoo")
        .setDescription("Awoo!"),
    async execute(interaction)
    {
        await interaction.reply("Awoo desu");
    },
};