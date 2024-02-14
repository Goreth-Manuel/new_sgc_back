'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Municipio', {
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
      belas: {
        type: Sequelize.STRING
      },
      cacuaco: {
        type: Sequelize.STRING
      },
      cazenga: {
        type: Sequelize.STRING
      },
      icoloeBengo: {
        type: Sequelize.STRING
      },
      luanda: {
        type: Sequelize.STRING
      },
      quicama: {
        type: Sequelize.STRING
      },
      kilambaKiaxi: {
        type: Sequelize.STRING
      },
      talatona: {
        type: Sequelize.STRING
      },
      viana: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })  
  },

  async down (queryInterface) {
    await queryInterface.dropTable('Municipio');
  }
};
