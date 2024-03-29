const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

// If required, action rows and buttons could be useful for changing pages

module.exports =
{
    cooldown: 1,
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Displays a list of the commands.")
        .setDMPermission(false),
    async execute(interaction)
    {
        const helpEmbed = new EmbedBuilder()
            .setColor(0xe92134)
            .setTitle("Help")
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .addFields(
                {
                    name: "Fun",
                    value:
                    `**/awoo**
                    *Awoo!*
                    **/battle**
                    *Initiates a battle between two players!*
                    **/headpat**
                    *So comfy.*
                    **/roll**
                    *Rolls a random number.*
                    **/say**
                    *Sends a message as Momiji.*
                    **/ship**
                    *Ships two members ♥*`,
                },
                {
                    name: "Utility",
                    value:
                    `**/help**
                    *Displays a list of the commands.*
                    **/info**
                    *Get information about a server member or the server*
                    **/ping**
                    *Ping?*`,
                },
                {
                    name: "Moderators Only",
                    value:
                    `**/response**
                    *Create, view, edit or delete responses.*
                    *(Requires "Manage Server" by default)*`,
                },
                {
                    name: "Other",
                    value: "I also have a 0.025% chance of being *very mean* to you.",
                },
            );

        await interaction.reply({ embeds: [helpEmbed] });
    },
};