'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Teacher.init({
    name: DataTypes.STRING,
    teacher_email: DataTypes.STRING,
    teacher_email_2: DataTypes.STRING,
    teacher_GUID:DataTypes.STRING,
    teacher_phone: DataTypes.STRING,
    teacher_phone_2: DataTypes.STRING,
    teacher_address: DataTypes.TEXT,
    teacher_date_employed:DataTypes.DATE
  },
   {
    sequelize,
    modelName: 'Teacher',
  });
  return Teacher;
};