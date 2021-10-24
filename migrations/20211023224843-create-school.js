'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Schools', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      school_owner_id: {
        type: Sequelize.INTEGER
      },
      school_GUID: {
        type: Sequelize.STRING
      },
      school_name: {
        type: Sequelize.STRING
      },
      school_email: {
        type: Sequelize.STRING
      },
      school_phone: {
        type: Sequelize.STRING
      },
      school_address: {
        type: Sequelize.TEXT
      },
      school_motto: {
        type: Sequelize.TEXT
      },
      school_logo: {
        type: Sequelize.STRING,
        allowNull:true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Schools');
  }
};