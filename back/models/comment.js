module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      commentType: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  Comment.associate = db => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
    db.Comment.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
    db.Comment.belongsToMany(db.User, { through: 'Dislike', as: 'Dislikers' });
  };
  return Comment;
};
