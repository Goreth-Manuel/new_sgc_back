'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Serie', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      salaId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Sala",
          },
          key: "id",
        },
        allowNull: false,
      },
      seccaoId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Seccao",
          },
          key: "id",
        },
        allowNull: false,
      },
      matriculaId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Matricula",
          },
          key: "id",
        },
        allowNull: false,
      },
      descricao: {
        type: Sequelize.DataTypes.STRING,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Serie');
  }
};