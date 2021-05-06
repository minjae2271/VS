module.exports = (sequelize, DataTypes) => {
    const PostType = sequelize.define(
        "PostType",
        {
            postTypeName: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true,
            }
        },
        {
          charset: "utf8mb4",
          collate: "utf8mb4_general_ci",
        }
    );
    PostType.associate = (db) => {
        db.PostType.hasMany(db.PostSubject, {
            onDelete: 'CASCADE',
            hooks: true,
        });
    };
    return PostType;
}