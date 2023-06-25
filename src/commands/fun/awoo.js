const { SlashCommandBuilder } = require("discord.js");

// TODO: More awoos

module.exports =
{
    cooldown: 1,
    data: new SlashCommandBuilder()
        .setName("awoo")
        .setDescription("Awoo!")
        .setDMPermission(false),
    async execute(interaction)
    {
        await interaction.reply("Awoo desu");
    },
};