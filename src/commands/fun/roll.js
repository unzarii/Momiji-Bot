const { SlashCommandBuilder } = require("discord.js");

// TODO: Improve this with proper support for multiple rolls and stuff
// Might be worth looking into subcommands
// roll d6/d8 etc
// roll multi (and provide your own) etc

module.exports =
{
    cooldown: 1,
    data: new SlashCommandBuilder()
        .setName("roll")
        .setDescription("Rolls a random number.")
        .addIntegerOption(option =>
            option.setName("max")
                .setDescription("The highest number to roll to")
                .setRequired(true))
        .setDMPermission(false),
    async execute(interaction)
    {
        const max = interaction.options.getInteger("max");
        const random = Math.round(Math.random() * max);

        await interaction.reply(`You rolled ${random}!`);
    },
};