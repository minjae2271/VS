const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

<<<<<<< HEAD
db.User = require('./user')(sequelize, Sequelize);

=======
db.User = require("./user")(sequelize, Sequelize);
>>>>>>> 9d415e8f8fdf9b4c77f26b9d37a1955564221aa2

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
