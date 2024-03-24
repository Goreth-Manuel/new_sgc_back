
const { Model, DataTypes } = require("sequelize");

class Matricula extends Model {
  static init(sequelize) {
    super.init(
      {
        inscricaoID: DataTypes.INTEGER,
        moradaCrianca: DataTypes.STRING,
        fotografiaCrianca: DataTypes.STRING,
        comprovativoPagamento: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "Matricula",
        tableName: "Matricula",
      }
    );
  }

  static associate(models) {
    /*
  this.belongsTo(models.Inscricao, {
    foreignKey: "inscricaoID",
    //through: "inscricaoMatricula",
    as: "Inscricao",
  });*/

  /*  this.hasMany(models.Matricula, {
      foreignKey: "municipioId",
      as: "matricula",
    });

    */
    
    this.hasMany(models.Serie, {
      foreignKey: "matriculaId",
      as: "Serie",
    });

   /* this.belongsTo(models.Serie, {
      foreignKey: "serieId",
      as: "Serie",
    });*/


  }
}

module.exports = Matricula;