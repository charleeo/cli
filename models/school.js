'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class School extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  School.init({
    school_owner_id: DataTypes.INTEGER,
    school_name: DataTypes.STRING,
    school_logo: DataTypes.STRING,
    school_motto: DataTypes.TEXT,
    school_address: DataTypes.TEXT,
    school_email: DataTypes.STRING,
    school_phone: DataTypes.STRING,
    school_GUID: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'School',
  });
  return School;
};