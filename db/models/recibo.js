'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recibo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Recibo.init({
    matricula_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Recibo',
  });
  return Recibo;
};