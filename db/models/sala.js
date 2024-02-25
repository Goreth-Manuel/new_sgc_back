const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sala extends Model {
    static associate(models) {
      // define association here
    }
  }
  Sala.init({
    numero: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Sala',
    tableName: "Inscricao",
  });
  return Sala;
};