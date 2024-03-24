const express = require("express");
const router = express.Router();
const { Sequelize } = require("sequelize");
const Sala = require("../db/models/sala");
const config = require("../db/config/config");
const yup = require("yup"); 

const environment = process.env.NODE_ENV || "development";
const dbConfig = config[environment];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

//const Sala = initSala(sequelize); 

//criar rota listar
router.get("/sala", async (req, res) => {
  //Receber o número da página, quando não é enviado o número da página é atribuido
  // a página 1
  const { page } = req.query;
 // console.log(page);

  //recuperar todos os usuários do banco de dados
  const sala = await Sala.findAll({
    // Ordenar os registros pela coluna id na forma decrescente
    //order: [['id', 'ASC']]
    attributes: [
      "id",
      "numero",
      "descricao",
      "seccaoId",
      "createdAt",
      "updatedAt",
    ],
  });

  if (sala) {
    return res.json({
      sala,
    });
  } else {
    return res.status(400).json({
      mensagem: "Erro: Não Possui Nenhuma sala",
    });
  }
});

// Criar rota Visualizar e receber o parâmetro id enviado na url
router.get("/sala/:id", async (req, res) => {
  // Receber o parâmetro enviado na URL
  const { id } = req.params;
  //console.log(id);

  // Verifique se tem uma inscricao com o id especificado existe
  const existingSala = await Sala.findByPk(id);

  if (!existingSala) {
    return res.status(404).json({ mensagem: "Sala não encontrada" });
  }

  //Recuperar o registo do banco de dados
  const sala = await Sala.findOne({
    // Indicar quais colunas recuperar
    attributes: [
      "id",
      "numero",
      "descricao",
      "seccaoId",
      "createdAt",
      "updatedAt",
    ],

    //Acrescentar a condição de qual registro deve ser retornado do banco de dados
    where: { id },
  });
  //console.log(usuario);

  if (sala) {
    // Pausar o processamento e retornar os dados
    return res.json({
      sala: sala.dataValues,
    });
  } else {
    // Pausar o processamento e retornar a mensagem de erro
    return res.status(400).json({
      mensagem: "Sala não encontrada",
    });
  }
});


module.exports = router;
