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
