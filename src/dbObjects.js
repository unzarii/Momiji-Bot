// This is the file where I would add associations between each of my models
// I have to do it in this file as they all need to be in one file for me to use them all together. I think. Idk. At least in a convenience sense.
// You think I'm actually paying attention to what I'm doing at 00:05am?

const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
    logging: false,
});

// Require all of my models here
// TODO: GuildConfig [GuildID PK, Levels Notifications]
const Response = require("./models/Response.js")(sequelize, Sequelize.DataTypes);

// TODO: Leaderboard [GuildID PK/FK, UserID PK, Experience Points]
// TOOD: Reminder [GuildID PK/FK, UserID PK, Reminder, Time]

// I could just say fuck it and not bother adding foreign relationships.
// Realistically the only relationship between any of these is the server. We'll see!

// --Define all foreign keys here--

// TODO: For Response, a foreign key will be the guildID

// Here I could add helper functions for getting and setting the DB stuff via Reflect/Object.defineProperty if I wanted to, for the Xtreme Precision(tm)
// But I can't be bothered. This is just what the guide did and it seemed neat.

module.exports = { Response };

// Keep this info for later. Yes I know this file is becoming a bit of a personal notepad.
// Getting items is similar; use .findAll() with the user's id as the key. The include key is for associating the CurrencyShop with the item. You must explicitly tell Sequelize to honor the .belongsTo() association; otherwise, it will take the path of the least effort.

// Note that sequelize is not closed.