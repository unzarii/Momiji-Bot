const { Events, PermissionFlagsBits } = require("discord.js");
const config = require("../../config.json");
const GetRandomFace = require("../helpers/GetRandomFace.js");
const { Op } = require("sequelize");

module.exports =
{
    name: Events.MessageCreate,
    async execute(message)
    {
        if (message.author.bot === true)
        {
            return;
        }

        // If DM, bully them
        if (message.guild === null)
        {
            console.log(`DM received: ${message.author.username} sent "${message.content}"`);

            message.channel.send({
                files: [{
                    attachment: "src/assets/you.mp4",
                    name: "you.mp4",
                    description: "I have crippling depression",
                }],
            }).catch(console.error);

            return;
        }

        // The following can only occur if the message is inside a server.
        // Ensure that the bot has send messages permissions
        const clientPermissions = message.channel.permissionsFor(message.guild.members.me);

        if (clientPermissions.has(PermissionFlagsBits.SendMessages))
        {
            /* --------------------------------
            --------- Easter Egg HELL ---------
            -------------------------------- */

            const messageLowercase = message.content.toLowerCase();

            if (messageLowercase === "roman")
            {
                if (clientPermissions.has(PermissionFlagsBits.AttachFiles))
                {
                    message.reply({
                        files: [{
                            attachment: "src/assets/roman.jpg",
                            name: "roman.jpg",
                            description: "Roman",
                        }],
                    }).catch(console.error);
                }
                else
                {
                    message.reply("I want to send the funny image but I don't have the Attach Files permission (｡•́︿•̀｡)").catch(console.error);
                }

                return;
            }
            else if (messageLowercase === "master chief, mind telling me what you're doing in that mcdonald's?")
            {
                if (clientPermissions.has(PermissionFlagsBits.AttachFiles))
                {
                    message.reply({
                        files: [{
                            attachment: "src/assets/masterchief.jpg",
                            name: "masterchief.jpg",
                            description: "Master Chief enjoying a Big Mac",
                        }],
                    }).catch(console.error);
                }
                else
                {
                    message.reply("I want to send the funny image but I don't have the Attach Files permission (｡•́︿•̀｡)").catch(console.error);
                }

                return;
            }

            /* --------------------------------
            ------- Database Responses --------
            -------------------------------- */

            const response = await message.client.db.Response.findOne({
                where:
                {
                    guildID: message.guild.id,
                    trigger:
                    {
                        [Op.like]: message.content,
                    },
                },
            });

            if (response)
            {
                message.reply(response.get("response")).catch(console.error);

                return;
            }

            /* --------------------------------
            -------- Haha Stinkyinator --------
            -------------------------------- */

            const rand = Math.random() * 100;

            // 0.025% chance
            const chance = 0.025;

            if ((rand <= chance))
            {
                if (message.author.id === config.owner)
                {
                    message.reply(`God you're so fucking cool say that again ${GetRandomFace()}.`).catch(console.error);
                }
                else
                {
                    message.reply("haha stinky").catch(console.error);
                }
            }
        }
    },
};