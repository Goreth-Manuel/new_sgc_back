'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Endereco', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      provinciaID: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Provincia",
          },
          key: "id",
        },
        allowNull: false,
      },
      municipioID: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Municipio",
          },
          key: "id",
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Endereco');
  }
};
