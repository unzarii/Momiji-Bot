const { SlashCommandBuilder } = require("discord.js");
const seedrandom = require("seedrandom");

module.exports =
{
    cooldown: 1,
    data: new SlashCommandBuilder()
        .setName("ship")
        .setDescription("Ships two members ♥")
        .addStringOption(option =>
            option
                .setName("first")
                .setDescription("The first lover")
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName("second")
                .setDescription("The second lover")
                .setRequired(true))
        .setDMPermission(false),
    async execute(interaction)
    {
        const lovers = [interaction.options.getString("first"), interaction.options.getString("second")];
        lovers.sort();

        // Create a seed with the current date, and the sorted names of the people being shipped.
        // "ship" is included, in case I make a similar command like this.
        const now = new Date();
        const seed = [now.toDateString(), lovers, "ship"].join(":");

        // Use seedrandom script to generate a seeded random, and transform into a "percentage"
        const rng = seedrandom(seed);
        const percentage = (Math.round(rng() * 100));
        const output = "**" + lovers[0] + "** & **" + lovers[1] + "**: " + percentage + "% Match";

        // TODO: If both strings are resolvable as users, take their names, cut them in half, and generate a ship name.
        // TODO: Create a disgusting image output.

        await interaction.reply(output);
    },
};