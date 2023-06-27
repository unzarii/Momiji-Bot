// This file creates the database. You only need to run this once or if the database needs amending via --force.
// Note that amending the database like this will remove all current data.

// I'm not sure how to migrate data - I think I can potentially just use "alter" if it won't cause any errors.
// https://medium.com/@smallbee/how-to-use-sequelize-sync-without-difficulties-4645a8d96841
// The above might have what I need. Something about migrations. I'll read it when I realise I need to edit the database again lmao.

// I can just use SYNC if all I need to do is create new tables. Modifying models is where the problem lies.

const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
});

// Weird way to make this work but idk another way to do it. In any case, it creates it.
// You'd also require the rest here too according to guide. You think I know what I'm doing?
const DatabaseTables = require("./models/Response.js")(sequelize, Sequelize.DataTypes);

const force = process.argv.includes("--force") || process.argv.includes("-f");

sequelize.sync({ force }).then(async () =>
{
    // Close sequelize as we are done.
    console.log("Database synced.");
    sequelize.close();
});
