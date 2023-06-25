const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const CalculateDurationBetweenDates = require("../../helpers/CalculateDurationBetweenDates");

module.exports =
{
    cooldown: 1,
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Get information about a server member or the server")
        .addSubcommand(subcommand =>
            subcommand
                .setName("member")
                .setDescription("Get information about a server member")
                .addUserOption(option =>
                    option
                        .setName("target")
                        .setDescription("The user")
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName("server")
                .setDescription("Get information about the server"))
        .setDMPermission(false),
    async execute(interaction)
    {
        if (interaction.options.getSubcommand() === "member")
        {
            const member = interaction.options.getMember("target");

            const memberLengthString = CalculateDurationBetweenDates(new Date(), member.joinedAt);
            const memberAgeString = CalculateDurationBetweenDates(new Date(), member.user.createdAt);

            const memberInfoEmbed = new EmbedBuilder()
                .setColor(0xe92134)
                .setTitle("Member Information")
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .addFields(
                    {
                        name: "Joined At:", value: member.joinedAt.toUTCString(),
                    },
                    {
                        name: "A Member For:", value: memberLengthString,
                    },
                    {
                        name: "Created At:", value: member.user.createdAt.toUTCString(),
                    },
                    {
                        name: "Account Age:", value: memberAgeString,
                    },
                    {
                        name: "ID:", value: member.id,
                    },
                );

            await interaction.reply({ embeds: [memberInfoEmbed] });
        }
        else if (interaction.options.getSubcommand() === "server")
        {
            const serverAgeString = CalculateDurationBetweenDates(new Date(), interaction.guild.createdAt);

            // Calculate how many channels of each type that there are
            let textChannels = 0;
            let voiceChannels = 0;
            let categories = 0;
            let publicThreads = 0;

            interaction.guild.channels.cache.forEach(channel =>
            {
                switch (channel.type)
                {
                case 0:
                    textChannels++;
                    break;
                case 2:
                    voiceChannels++;
                    break;
                case 4:
                    categories++;
                    break;
                case 11:
                    publicThreads++;
                    break;
                default:
                }
            });

            const serverInfoEmbed = new EmbedBuilder()
                .setColor(0xe92134)
                .setTitle("Server Information")
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .addFields(
                    {
                        name: "Server Creation Date:", value: interaction.guild.createdAt.toUTCString(),
                    },
                    {
                        name: "Server Age:", value: serverAgeString,
                    },
                    {
                        name: "Text Channels:", value: textChannels.toString(), inline: true,
                    },
                    {
                        name: "Voice Channels:", value: voiceChannels.toString(), inline: true,
                    },
                    {
                        name: "Categories:", value: categories.toString(), inline: true,
                    },
                    {
                        name: "Public Threads:", value: publicThreads.toString(), inline: true,
                    },
                    {
                        name: "Member Count:", value: interaction.guild.memberCount.toString(), inline: true,
                    },
                    {
                        name: "Roles:", value: interaction.guild.roles.cache.size.toString(), inline: true,
                    },
                    {
                        name: "Owner:", value: "<@" + interaction.guild.ownerId + ">",
                    },
                );

            await interaction.reply({ embeds: [serverInfoEmbed] });
        }
    },
};