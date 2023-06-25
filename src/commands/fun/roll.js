const { SlashCommandBuilder } = require("discord.js");

// TODO: Improve this with proper support for multiple rolls and stuff
// Might be worth looking into subcommands
// roll d6/d8 etc
// roll multi (and provide your own) etc

// Maybe for roll multi I could do a single message that you can keep pressing buttons on to keep rolling dice
// Rolled dice would just be edited into the message
// Would need a timeout or perhaps I can just let it keep going if I like - maybe discord has its own timeout?
// Check discordjs.guide

module.exports =
{
    cooldown: 1,
    data: new SlashCommandBuilder()
        .setName("roll")
        .setDescription("Rolls a random number.")
        .addIntegerOption(option =>
            option.setName("max")
                .setDescription("The highest number to roll to")
                .setRequired(true)),
    async execute(interaction)
    {
        const max = interaction.options.getInteger("max");
        const random = Math.round(Math.random() * max);

        await interaction.reply(`You rolled ${random}!`);
    },
};