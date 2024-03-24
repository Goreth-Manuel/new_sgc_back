module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Matricula", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      inscricaoID: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Inscricao",
          },
          key: "id",
        },
        allowNull: false,
      },
      comprovativoPagamento: {
        type: Sequelize.STRING,
      },
      moradaCrianca: {
        type: Sequelize.STRING,
      },
      fotografiaCrianca: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Matricula");
  }
};