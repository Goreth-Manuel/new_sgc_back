const { Model, DataTypes } = require("sequelize");

class Seccao extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "Seccao",
        tableName: "Seccao",
      }
    );
  }

  static associate(models) {
    /*
    this.hasMany(models.Sala, {
      foreignKey: "salaId",
      as: "Sala",
    });
    */
    this.hasMany(models.Sala, {
      foreignKey: "seccaoId",
      as: "Sala",
    });

    this.hasMany(models.Serie, {
      foreignKey: "seccaoId",
      as: "Serie",
    });


  }
}

module.exports = Seccao;