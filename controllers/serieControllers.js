const express = require("express");
const router = express.Router();
const { Sequelize } = require("sequelize");
const Serie = require("../db/models/serie");
const Matricula = require("../db/models/matriculaModels");
const Inscricao = require("../db/models/inscricaoModels");
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

//const Serie = initSerie(sequelize);
//const Matricula = initMatriculaModel(sequelize);
//const Inscricao = initInscricaoModel(sequelize);
//const Seccao = initSeccaoModel(sequelize);
//const Sala = initSala(sequelize);

router.post("/serie", async (req, res) => {
  try {
    const {
      salaId,
      seccaoId,
      matriculaId,
      nome,
    } = req.body;
    const newSerie = await Serie.create({
      salaId,
      seccaoId,
      matriculaId,
      nome,
    })
    return res.json(newSerie); 
  } catch (error) {
    res.json(error);
  }
});

//criar rota listar
router.get("/serie", async (req, res) => {
  //Receber o número da página, quando não é enviado o número da página é atribuido
  // a página 1
  const { page } = req.query;
 // console.log(page);

  //recuperar todos os usuários do banco de dados
  const serie = await Serie.findAll({
    include:[
      {all: true}
    ]
  });

  if(!serie){
    return res.status(400).json({
      mensagem: "Erro: Não possui nenhuma série",
    });
  }

  return res.json({serie})
});


// Criar rota Visualizar e receber o parâmetro id enviado na url
router.get("/serie/:id", async (req, res) => {
  // Receber o parâmetro enviado na URL
  const { id } = req.params;
  //console.log(id);

  // Verifique se tem uma inscricao com o id especificado existe
  const existingSerie = await Serie.findByPk(id);

  if (!existingSerie) {
    return res.status(404).json({ mensagem: "Sala não encontrada" });
  }

  //Recuperar o registo do banco de dados
  const serie = await Serie.findOne({
    // Indicar quais colunas recuperar
    attributes: [
      "id",
      "salaId",
      "seccaoId",
      "matriculaId",
      "descricao",
      "createdAt",
      "updatedAt",
    ],

    //Acrescentar a condição de qual registro deve ser retornado do banco de dados
    where: { id },
  });
  //console.log(usuario);

  if (serie) {
    // Pausar o processamento e retornar os dados
    return res.json({
      serie: serie.dataValues,
    });
  } else {
    // Pausar o processamento e retornar a mensagem de erro
    return res.status(400).json({
      mensagem: "Serie não encontrada",
    });
  }
});


module.exports = router;
