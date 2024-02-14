const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Matricula extends Model {
    static associate(models) {
      // Defina associações aqui, se necessário
    }
  }

  Matricula.init(
    {
      comprovativoPagamento: DataTypes.STRING,
      moradaCrianca: DataTypes.STRING,
      fotografiaCrianca: DataTypes.STRING,
      inscricaoID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Matricula",
      tableName: "Matricula",
    }
  );

  return Matricula;
};
