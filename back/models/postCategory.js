module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define(
        "PostCategory",
        {
            postCategoryName: {
                type: DataTypes.STRING(20),
                allowNull: false,
            }
        },
        {
          charset: "utf8mb4",
          collate: "utf8mb4_general_ci",
        }
    );
    PostCategory.associate = (db) => {
        
    };
    return PostCategory;
}