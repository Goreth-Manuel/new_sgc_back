'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Recibo', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      matriculaID: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Matricula",
          },
          key: "id",
        },
        allowNull: false,
      },
      nomeCrianca: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE  
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('Recibo');
  }
};