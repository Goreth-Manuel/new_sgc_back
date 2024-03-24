const { Model, DataTypes } = require("sequelize");

class Serie extends Model {
  static init(sequelize) {
    super.init(
      {
        salaId: DataTypes.INTEGER,
        seccaoId: DataTypes.INTEGER,
        matriculaId: DataTypes.INTEGER,
        descricao: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "Serie",
        tableName: "Serie",
      }
    );
  }

  static associate(models) {
  this.belongsTo(models.Seccao, {
    foreignKey: "seccaoId",
    as: "Seccao",
  });

  this.belongsTo(models.Matricula, {
    foreignKey: "matriculaId",
    as: "Matricula",
  });

  this.belongsTo(models.Sala, {
    foreignKey: "salaId",
    as: "Sala",
  });


  }
}

module.exports = Serie;