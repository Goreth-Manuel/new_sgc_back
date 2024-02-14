'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CrincaSala extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CrincaSala.init({
    matriculaId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CrincaSala',
  });
  return CrincaSala;
};