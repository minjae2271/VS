module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      userType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      nickname: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );
  User.associate = db => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.hasMany(db.Pick);
    db.User.belongsToMany(db.Comment, { through: 'Like', as: 'Liked' });
    db.User.belongsToMany(db.Comment, { through: 'Dislike', as: 'Disliked' });
  };
  return User;
};
