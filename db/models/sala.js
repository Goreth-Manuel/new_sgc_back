
const { Model, DataTypes } = require("sequelize");

class Sala extends Model {
  static init(sequelize) {
    super.init(
      {
        seccaoId: DataTypes.INTEGER,
        numero: DataTypes.STRING,
        descricao: DataTypes.STRING
      },
      {
        sequelize,
        modelName: 'Sala',
        tableName: "Sala",
      }
    );
  }

  static associate(models) {
    /*
    this.belongsTo(models.Seccao, {
      foreignKey: "salaId",
      as: "Seccao",
    });
    */

    this.belongsTo(models.Seccao, {
      foreignKey: "seccaoId",
      as: "Seccao",
    });

   this.hasMany(models.Serie, {
      foreignKey: "salaId",
      as: "Serie",
    });
    
  }

}

module.exports = Sala;
