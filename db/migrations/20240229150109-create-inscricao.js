
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Inscricao", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nomeDoPai: {
        type: Sequelize.STRING,
      },
      nomeDaMae: {
        type: Sequelize.STRING,
      },
      nomeDaCrianca: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      genero: {
        type: Sequelize.STRING,
      },
      idade: {
        type: Sequelize.DATE,
      },
      possuiNecessidadeEspecial: {
        type: Sequelize.STRING,
      },
      descricaoDaNecessidadeEspecial: {
        type: Sequelize.STRING,
      },
      telefone: {
        type: Sequelize.STRING,
      },
      BIDoPai: {
        type: Sequelize.STRING,
      },
      BIDaMae: {
        type: Sequelize.STRING,
      },
      cedulaDeNascimentoDaCrianca: {
        type: Sequelize.STRING,
      },
      declaracaoTrabalho: {
        type: Sequelize.STRING,
      },
      estado: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Inscricao');
  }
};