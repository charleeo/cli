'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
      await queryInterface.addColumn('teachers','state_id', { type: Sequelize.INTEGER });
     
  },

  down: async (queryInterface, Sequelize) => {
    
      await queryInterface.removeColumn('state_id');
     
  }
};
