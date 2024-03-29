const { Events, Collection } = require("discord.js");

module.exports =
{
    name: Events.InteractionCreate,
    async execute(interaction)
    {
        // Avoid non-slash commands apparently
        // FIXME: If I need to remove this for buttons etc.
        if (!interaction.isChatInputCommand()) return;

        // Check whether the command actually exists
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command)
        {
            console.error(`No command matching ${command} was found/`);
            return;
        }

        // COOLDOWNS
        const { cooldowns } = interaction.client;

        // If no cooldown is currently present for this command, then create one
        if (!cooldowns.has(command.data.name))
        {
            // Empty collection for the purpose of making this work
            const dummyCollection = new Collection();
            cooldowns.set(command.data.name, dummyCollection);
        }

        const now = Date.now();

        // Get the collection of userid/timestamps for the current command
        const timestamps = cooldowns.get(command.data.name);

        // Decide whether to use the command cooldown or a default one.
        const defaultCooldownDuration = 1;
        const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

        if (timestamps.has(interaction.user.id))
        {
            // Get the time the user last used the command and add the cooldown to find the expiration
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

            if (now < expirationTime)
            {
                const expiredTimestamp = Math.round(expirationTime / 1000);
                return interaction.reply({ content: `Chill out!!!! You can try "${command.data.name}" again <t:${expiredTimestamp}:R>!!!!! (｡•́︿•̀｡)`, ephemeral: true });
            }
        }

        // I would expect that just being in the collection is enough proof that you are still under cooldown.
        // Unsure why discordjs.guide wants me to check whether now < expiration when the item gets deleted after the cooldown anyway.
        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

        // EXECUTE COMMANDS

        try
        {
            const timestamp = new Date();
            console.log(`> [${timestamp.toUTCString()}] ${interaction.user.username} (${interaction.user.id}) executed "${command.data.name}" command in ${interaction.guild.name} (${interaction.guild.id}).`);
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