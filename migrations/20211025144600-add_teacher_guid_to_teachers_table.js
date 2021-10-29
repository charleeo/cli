'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.addColumn('teachers','teacher_GUID', { type: Sequelize.STRING });
     
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.removeColumn('teachers','teacher_GUID');

  }
};
