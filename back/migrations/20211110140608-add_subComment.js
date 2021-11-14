'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Comments", "group_id", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Comments", "parent_id", {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Comments", "group_id");
    await queryInterface.removeColumn("Comments", "parent_id");
  }
};
