<<<<<<< HEAD
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    User.associate = (db) => {

    };
    return User;
}
=======
// sequelize, DataTypes를 parameter로 하는 함수를 모듈화 한다.
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      // id, createdAt, UpdatedAt Column auto generated
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // hangle
    }
  );
  User.associate = (db) => {};
  return User;
};
>>>>>>> 9d415e8f8fdf9b4c77f26b9d37a1955564221aa2
