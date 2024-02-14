const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Inscricao extends Model {
    static associate(models) {
      // Defina associações aqui, se necessário
    }
  }

  Inscricao.init(
    {
      nomeDoPai: DataTypes.STRING,
      nomeDaMae: DataTypes.STRING,
      nomeDaCrianca: DataTypes.STRING,
      email: DataTypes.STRING,
      genero: DataTypes.STRING,
      idade: DataTypes.DATE,
      descricaoDaNecessidadeEspecial: DataTypes.STRING,
      possuiNecessidadeEspecial: DataTypes.STRING,
      telefone: DataTypes.STRING,
      BIDoPai: DataTypes.STRING,
      BIDaMae: DataTypes.STRING,
      cedulaDeNascimentoDaCrianca: DataTypes.STRING,
      declaracaoTrabalho: DataTypes.STRING,
      estado: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Inscricao",
      tableName: "Inscricao",
    }
  );

  return Inscricao;
};
