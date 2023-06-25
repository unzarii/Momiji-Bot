const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports =
{
    cooldown: 1,
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("Sends a message as Momiji.")
        .addStringOption(option =>
            option
                .setName("message")
                .setDescription("The message you want to send.")
                .setRequired(true))
        .setDMPermission(false),
    async execute(interaction)
    {
        const message = interaction.options.getString("message");

        const clientPermissions = interaction.channel.permissionsFor(interaction.client.user);

        if (clientPermissions.has(PermissionFlagsBits.SendMessages))
        {
            interaction.channel.send(message);
            await interaction.reply({ content: "Sent your message!", ephemeral: true });
        }
        else
        {
            await interaction.reply({ content: "I need the Send Messages permission to send that message! (｡•́︿•̀｡)", ephemeral: true });
        }
    },
};