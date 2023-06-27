const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports =
{
    cooldown: 1,
    data: new SlashCommandBuilder()
        .setName("response")
        .setDescription("Create, view, edit or delete responses.")
        .setDMPermission(false)
        .addSubcommand(subcommand =>
            subcommand
                .setName("create")
                .setDescription("Create a response")
                .addStringOption(option =>
                    option
                        .setName("trigger")
                        .setDescription("The word or phrase that triggers the response")
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName("response")
                        .setDescription("The response to the trigger")
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName("view")
                .setDescription("View all responses"))
        .addSubcommand(subcommand =>
            subcommand
                .setName("edit")
                .setDescription("Edit a response")
                .addStringOption(option =>
                    option
                        .setName("trigger")
                        .setDescription("The word or phrase that triggers the response")
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName("response")
                        .setDescription("The new response to the trigger")
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName("delete")
                .setDescription("Delete a response")
                .addStringOption(option =>
                    option
                        .setName("trigger")
                        .setDescription("The word or phrase that triggers the response")
                        .setRequired(true)))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction)
    {
        if (interaction.options.getSubcommand() === "create")
        {
            const trigger = interaction.options.getString("trigger");
            const response = interaction.options.getString("response");

            // Accommodate for Easter eggs
            if (trigger.toLowerCase() === "roman" || trigger.toLowerCase() === "master chief, mind telling me what you're doing in that mcdonald's")
            {
                return interaction.reply({ content: `Sorry, "${trigger}" is reserved for shenanigans!`, ephemeral: true });
            }

            try
            {
                await interaction.client.db.Response.create({
                    guildID: interaction.guild.id,
                    trigger: trigger,
                    response: response,
                });

                return interaction.reply({ content: `Response "${trigger}" added`, ephemeral: true });
            }
            catch (error)
            {
                if (error.name === "SequelizeUniqueConstraintError")
                {
                    return interaction.reply({ content: `"${trigger}" is already a trigger for a different Response!`, ephemeral: true });
                }

                console.error(error);
                return interaction.reply({ content: `Could not create "${trigger}" Response!`, ephemeral: true });
            }
        }
        else if (interaction.options.getSubcommand() === "view")
        {
            try
            {
                const responseList = await interaction.client.db.Response.findAll({
                    where: { guildID: interaction.guild.id },
                    attributes: ["trigger", "response"],
                });

                let responseString = "";

                responseList.map(response =>
                {
                    responseString += `${response.trigger} : ${response.response}\n`;
                });

                const responseEmbed = new EmbedBuilder()
                    .setColor(0xe92134)
                    .setTitle(`All Responses for ${interaction.guild.name}`)
                    .addFields(
                        {
                            name: "Responses",
                            value: responseString || "No responses available.",
                        },
                    );

                return interaction.reply({ embeds: [responseEmbed] });
            }
            catch (error)
            {
                console.error(error);
                return interaction.reply({ content: "Could not view responses!", ephemeral: true });
            }
        }
        else if (interaction.options.getSubcommand() === "edit")
        {
            const trigger = interaction.options.getString("trigger");
            const response = interaction.options.getString("response");

            const affectedRows = await interaction.client.db.Response.update({ response: response }, {
                where:
                {
                    guildID: interaction.guild.id,
                    trigger: trigger,
                },
            });

            if (affectedRows > 0)
            {
                return interaction.reply({ content: `The response for "${trigger}" was changed to "${response}".`, ephemeral: true });
            }

            return interaction.reply("That trigger doesn't exist.");
        }
        else if (interaction.options.getSubcommand() === "delete")
        {
            const trigger = interaction.options.getString("trigger");

            const rowCount = await interaction.client.db.Response.destroy({
                where:
                {
                    guildID: interaction.guild.id,
                    trigger: trigger,
                },
            });

            if (rowCount === 0)
            {
                return interaction.reply("That trigger doesn't exist.");
            }

            return interaction.reply({ content: `"${trigger}" was deleted.`, ephemeral: true });
        }
    },
};