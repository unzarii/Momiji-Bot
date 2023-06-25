const { Events } = require("discord.js");

module.exports =
{
    name: Events.Error,
    execute(error)
    {
        console.log(error);
        console.log("Just wondering if this works");
    },
};