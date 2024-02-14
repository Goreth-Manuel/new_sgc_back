const express = require("express");
const router = express.Router();
const { Sequelize } = require("sequelize");
const initUsuarioModel = require("../db/models/user");
const config = require("../db/config/config");

const environment = process.env.NODE_ENV || "development";
const dbConfig = config[environment];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

const Usuario = initUsuarioModel(sequelize);

//criar rota listar
router.get("/users", async (req, res) => {
  //Receber o número da página, quando não é enviado o número da página é atribuido
  // a página 1
  const { page } = req.query;
  console.log(page);

  //recuperar todos os usuários do banco de dados
  const usuario = await Usuario.findAll({
    // Ordenar os registros pela coluna id na forma decrescente
    //order: [['id', 'ASC']]
    attributes: ["id", "name", "email", "updatedAt"],
  });

  if (usuario) { 
    return res.json({
      usuario,
    });
  } else {
    return res.status(400).json({
      mensagem: "Erro: Nenhum cadastro enviado",
    });
  }
});

// Criar rota Visualizar e receber o parâmetro id enviado na url
router.get("/users/:id", async (req, res) => {
  // Receber o parâmetro enviado na URL
  const { id } = req.params;
  //console.log(id);

  // Verifique se o usuário com o ID especificado existe
  const existingUser = await Usuario.findByPk(id);

  if (!existingUser) {
    return res.status(404).json({ mensagem: "Usuário não encontrado" });
  }

  //Recuperar o registo do banco de dados
  const usuario = await Usuario.findOne({
    // Indicar quais colunas recuperar
    attributes: ["id", "name", "email", "createdAt", "updatedAt"],

    //Acrescentar a condição de qual registro deve ser retornado do banco de dados
    where: { id },
  });
  //console.log(usuario);

  if (usuario) {
    // Pausar o processamento e retornar os dados
    return res.json({
      usuario: usuario.dataValues,
    });
  } else {
    // Pausar o processamento e retornar a mensagem de erro
    return res.status(400).json({
      mensagem: "Usuario não encontrado",
    });
  }
});

// Rota de edição
router.put("/users/:id", async (req, res) => {
  try {
    // Receba os dados enviados no corpo da requisição
    const dados = req.body;

    // Obtenha o ID do usuário a ser editado da URL
    const userId = req.params.id;

    // Verifique se o usuário com o ID especificado existe
    const existingUser = await Usuario.findByPk(userId);

    if (!existingUser) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    // Atualize os dados no banco de dados
    await Usuario.update(dados, { where: { id: userId } });

    return res.json({ mensagem: "Usuário editado com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ mensagem: "Erro: Usuário não editado!" });
  }
});

// Rota de exclusão
router.delete("/users/:id", async (req, res) => {
  try {
    // Receba o ID do usuário a ser apagado da URL
    const { id } = req.params;

    // Verifique se o usuário com o ID especificado existe
    const existingUser = await Usuario.findByPk(id);

    if (!existingUser) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    // Apague o usuário no banco de dados
    await Usuario.destroy({ where: { id } });

    return res.json({ mensagem: "Usuário apagado com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ mensagem: "Erro: Usuário não apagado" });
  }
});

// Exportar a instrução que está dentro da costante router
module.exports = router;
