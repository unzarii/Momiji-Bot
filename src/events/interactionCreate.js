const { Events } = require("discord.js");

module.exports =
{
    name: Events.InteractionCreate,
    async execute(interaction)
    {
    // Avoid non-slash commands apparently
        if (!interaction.isChatInputCommand()) return;

        // Check whether the command actually exists
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command)
        {
            console.error(`No command matching ${command} was found/`);
            return;
        }

        // Attempt to execute the command
        try
        {
            console.log(`Executing ${interaction.commandName} command.`);
            await command.execute(interaction);
        }
        catch (error)
        {
            console.log(error);

            // If the bot has already responded or was still thinking, then check for those and use followUp as you cannot use reply in succession.
            if (interaction.replied || interaction.deferred)
            {
                await interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true });
            }
            else
            {
                await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
            }
        }
    },
};