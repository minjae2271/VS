module.exports = (sequelize, DataTypes) => {
    const Pick = sequelize.define(
        "Pick",
        {
            contentNum: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        }
    );
    Pick.associate = (db) => {
        db.Pick.belongsTo(db.User);
        db.Pick.belongsTo(db.Post);       
    };
    return Pick;
}