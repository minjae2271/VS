module.exports = (sequelize, DataTypes) => {
    const PostSubject = sequelize.define(
        "PostSubject",
        {
            postSubjectName: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true,
            },
        },
        {
          charset: "utf8mb4",
          collate: "utf8mb4_general_ci",
        }
    );
    PostSubject.associate = (db) => {
        db.PostSubject.belongsTo(db.PostType);
    };
    return PostSubject;
}