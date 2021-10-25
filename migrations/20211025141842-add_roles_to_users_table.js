'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await  queryInterface.addColumn('users','role_id',
    {
      type: Sequelize.INTEGER,
      allowNull:false
    }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users','role_id')
  }
};
