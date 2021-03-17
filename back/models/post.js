module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', { 
        postType: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        content1: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        content2: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    }, {
        charset: 'utf8mb4',
        collate:  'utf8mb4_general_ci'
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
    };
    return Post;
}