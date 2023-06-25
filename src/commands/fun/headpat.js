const { SlashCommandBuilder } = require("discord.js");
const GetRandomFace = require("../../helpers/GetRandomFace.js");

module.exports =
{
    cooldown: 1,
    data: new SlashCommandBuilder()
        .setName("headpat")
        .setDescription("So comfy."),
    async execute(interaction)
    {
        await interaction.reply(`${GetRandomFace()}`);
    },
};