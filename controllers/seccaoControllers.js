const express = require("express");
const router = express.Router();
const { Sequelize } = require("sequelize");
const Seccao = require("../db/models/seccao");
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

//const Seccao = initSeccao(sequelize); 

  
//criar rota listar
router.get("/seccao", async (req, res) => {
  //Receber o número da página, quando não é enviado o número da página é atribuido
  // a página 1
 //const { page } = req.query;
 // console.log(page);

  //recuperar todos os usuários do banco de dados
  const seccao = await Seccao.findAll({
    // Ordenar os registros pela coluna id na forma decrescente
    //order: [['id', 'ASC']]
    attributes: [
      "id",
      "nome",
      "descricao",
      "createdAt",
      "updatedAt",
    ],
  });

  if (seccao) {
    return res.json({
      seccao,
    });
  } else {
    return res.status(400).json({
      mensagem: "Erro: Não Possui Nenhuma seccao",
    });
  }
});

// Criar rota Visualizar e receber o parâmetro id enviado na url
router.get("/seccao/:id", async (req, res) => {
  // Receber o parâmetro enviado na URL
  const { id } = req.params;
  //console.log(id);

  // Verifique se tem uma inscricao com o id especificado existe
  const existingSeccao = await Seccao.findByPk(id);

  if (!existingSeccao) {
    return res.status(404).json({ mensagem: "Secção não encontrada" });
  }

  //Recuperar o registo do banco de dados
  const seccao = await Seccao.findOne({
    // Indicar quais colunas recuperar
    attributes: [
      "id",
      "nome",
      "descricao",
      "createdAt",
      "updatedAt",
    ],

    //Acrescentar a condição de qual registro deve ser retornado do banco de dados
    where: { id },
  });
  //console.log(usuario);

  if (seccao) {
    // Pausar o processamento e retornar os dados
    return res.json({
      seccao: seccao.dataValues,
    });
  } else {
    // Pausar o processamento e retornar a mensagem de erro
    return res.status(400).json({
      mensagem: "Seccao não encontrada",
    });
  }
});


module.exports = router;
