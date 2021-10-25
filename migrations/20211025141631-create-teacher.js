'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Teachers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teacher_name: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      teacher_email: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      teacher_email_2: {
        type: Sequelize.STRING,
        allowNull:true,
        defaultValue:null
      },
      teacher_phone: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      teacher_phone_2: {
        type: Sequelize.STRING,
        allowNull:true,
        defaultValue:null
      },
      teacher_address:{
        type: Sequelize.STRING,
        allowNull:false
      },
      teacher_date_employed:{
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.DATE
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
    await queryInterface.dropTable('Teachers');
  }
};