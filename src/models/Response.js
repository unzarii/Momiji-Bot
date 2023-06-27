module.exports = (sequelize, DataTypes) =>
{
    return sequelize.define("Response", {
        guildID:
        {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        trigger:
        {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        response:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    });
};