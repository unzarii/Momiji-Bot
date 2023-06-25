const { Events, PermissionsBitField } = require("discord.js");
const config = require("../../config.json");
const GetRandomFace = require("../helpers/GetRandomFace.js");

module.exports =
{
    name: Events.MessageCreate,
    execute(message)
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

        const clientPermissions = message.channel.permissionsFor(message.guild.members.me);

        if (clientPermissions.has(PermissionsBitField.Flags.SendMessages))
        {
            /* --------------------------------
            -------- Autoresponse HELL --------
            -------------------------------- */

            const messageLowercase = message.content.toLowerCase();

            // List of possible "I'm" permutations
            const imArray = ["i'm", "im", "i am"];

            if (imArray.includes(messageLowercase))
            {
                message.reply("stinky").catch(console.error);
                return;
            }
            else if (messageLowercase === "ye :)")
            {
                message.reply("ye :)").catch(console.error);
                return;
            }
            else if (messageLowercase === "ye (:")
            {
                message.reply("ye (:").catch(console.error);
                return;
            }
            else if (messageLowercase === "ye")
            {
                message.reply("ye").catch(console.error);
                return;
            }
            else if (messageLowercase === "roman")
            {
                if (clientPermissions.has(PermissionsBitField.Flags.AttachFiles))
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
                if (clientPermissions.has(PermissionsBitField.Flags.AttachFiles))
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