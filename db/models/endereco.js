'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Endereco extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Provincia, {
        foreignKey: "provinciaID",
        as: "Provincia",
      });

      this.belongsTo(models.Municipio, {
      foreignKey: "municipioID",
      as: "Municipio",
    });
    }
  }
  Endereco.init({
    Luanda: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Endereco',
    tableName: "Endereco",
  });
  return Endereco;
};