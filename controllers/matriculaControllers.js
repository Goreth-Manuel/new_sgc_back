const express = require("express");
const router = express.Router();
const { Sequelize } = require("sequelize");
const initMatriculaModel = require("../db/models/matriculaModels");
const config = require("../db/config/config");
const yup = require("yup");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); 
  }
});


const upload = multer({ storage: storage});

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

const Matricula = initMatriculaModel(sequelize);

//Registar matricula
router.post(
  "/matricula",
  upload.fields([
    { name: "comprovativoPagamento" },
    { name: "fotografiaCrianca" },
  ]),
  async (req, res) => {
    try {
      // Validar os dados enviados pelo formulário
      const schema = yup.object().shape({
        moradaCrianca: yup
          .string("Erro: Insira a morada da criança")
          .required("Insira a morada da criança"),
        inscricaoID: yup
          .string("Erro: Id da inscricao obrigatório")
          .required("Id da inscricao obrigatório"),
    
      });

      await schema.validate(req.body, { abortEarly: false });

      if (
        req.files &&
        req.files["comprovativoPagamento"] &&
        req.files["comprovativoPagamento"].length > 0 &&
        req.files["fotografiaCrianca"] &&
        req.files["fotografiaCrianca"].length > 0 
      ) {
        const newMatricula = await Matricula.create({
          moradaCrianca: req.body.moradaCrianca,
          inscricaoID: req.body.inscricaoID,
          moradaCrianca: req.body.moradaCrianca,
          comprovativoPagamento: req.files["comprovativoPagamento"][0].path,
          fotografiaCrianca: req.files["fotografiaCrianca"][0].path,
          
          // Outros campos de usuário, se houverem
        });

        res.status(200).json({ newMatricula });
      } else {
        res
          .status(400)
          .json({ message: "Ficheiros obrigatórios não foram enviados" });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error });
    }
  }
);

//criar rota listar
router.get("/matricula", async (req, res) => {
  //Receber o número da página, quando não é enviado o número da página é atribuido
  // a página 1
  const { page } = req.query;
 // console.log(page);

  //recuperar todos os usuários do banco de dados
  const matricula = await Matricula.findAll({
    // Ordenar os registros pela coluna id na forma decrescente
    //order: [['id', 'ASC']]
    attributes: [
      "id",
      "moradaCrianca",
      "inscricaoID",
      "comprovativoPagamento",
      "fotografiaCrianca",
      "createdAt",
      "updatedAt",
    ],
  });

  if (matricula) {
    return res.json({
      matricula,
    });
  } else {
    return res.status(400).json({
      mensagem: "Erro: Não Possui Nenhuma matricula",
    });
  }
});

// Criar rota Visualizar e receber o parâmetro id enviado na url
router.get("/matricula/:id", async (req, res) => {
  // Receber o parâmetro enviado na URL
  const { id } = req.params;
  //console.log(id);

  // Verifique se tem uma matricula com o id especificado existe
  const existingMatricula = await Matricula.findByPk(id);

  if (!existingMatricula) {
    return res.status(404).json({ mensagem: "Matricula não encontrada" });
  }

  //Recuperar o registo do banco de dados
  const matricula = await Matricula.findOne({
    // Indicar quais colunas recuperar
    attributes: [
      "id",
      "moradaCrianca",
      "inscricaoID",
      "comprovativoPagamento",
      "fotografiaCrianca",
      "createdAt",
      "updatedAt",
    ],

    //Acrescentar a condição de qual registro deve ser retornado do banco de dados
    where: { id },
  });
  //console.log(usuario);

  if (matricula) {
    // Pausar o processamento e retornar os dados
    return res.json({
      matricula: matricula.dataValues,
    });
  } else {
    // Pausar o processamento e retornar a mensagem de erro
    return res.status(400).json({
      mensagem: "Matricula não encontrada",
    });
  }
});

// Rota de edição
router.put("/matricula/:id", async (req, res) => {
  try {
    // Receba os dados enviados no corpo da requisição
    const dados = req.body;

    // Obtenha o ID do usuário a ser editado da URL
    const matriculaId = req.params.id;

    // Verifique se o usuário com o ID especificado existe
    const existingMatricula = await Usuario.findByPk(matriculaId);

    if (!existingMatricula) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    // Atualize os dados no banco de dados
    await Matricula.update(dados, { where: { id: matriculaId } });

    return res.json({ mensagem: "Matricula editada com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ mensagem: "Erro: Matricula não editada!" });
  }
});

// Rota de exclusão
router.delete("/matricula/:id", async (req, res) => {
  try {
    // Receba o ID do usuário a ser apagado da URL
    const { id } = req.params;

    // Verifique se o usuário com o ID especificado existe
    const existingMatricula = await Matricula.findByPk(id);

    if (!existingMatricula) {
      return res.status(404).json({ mensagem: "Inscrição não encontrada" });
    }

    // Apague o usuário no banco de dados
    await Matricula.destroy({ where: { id } });

    return res.json({ mensagem: "Matricula apagada com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ mensagem: "Erro: Matricula não apagada" });
  }
});

// rota estado
router.put("/actualizar_matricula/:id", async (req, res) => {
  try {
    // Receba o ID da inscrição e o novo estado da URL e do corpo da requisição
    const { id } = req.params;
    const { estado } = req.body; // Adicione outros campos aqui se necessário

    // Verifique se a inscrição com o ID especificado existe
    const existingMatricula = await Matricula.findByPk(id);

    if (!existingMatricula) {
      return res.status(404).json({ mensagem: "Matricula não encontrada" });
    }

    // Atualize o estado da inscrição no banco de dados
    await existingMatricula.update({ estado: estado }); // Atualize outros campos aqui se necessário

    return res.json({ mensagem: "Estado da Matricula atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ mensagem: "Erro ao atualizar o estado da Matricula" });
  }
});

// Exportar a instrução que está dentro da costante router
module.exports = router;
