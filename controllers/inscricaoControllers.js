const express = require("express");
const router = express.Router();
const { Sequelize } = require("sequelize");
const Inscricao = require("../db/models/inscricaoModels");
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
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

//const Inscricao = initInscricaoModel(sequelize);

//Registar inscricao
router.post(
  "/inscricao",
  upload.fields([
    { name: "BIDoPai" },
    { name: "BIDaMae" },
    { name: "cedulaDeNascimentoDaCrianca" },
    { name: "declaracaoTrabalho" },
  ]),
  async (req, res) => {
    try {
      // Validar os dados enviados pelo formulário
      const schema = yup.object().shape({
        nomeDoPai: yup
          .string("Erro: Insira o nome do pai")
          .required("Insira o nome do pai"),
        nomeDaMae: yup
          .string("Erro: Insira o nome do mãe")
          .required("Insira o nome do mãe"),
        nomeDaCrianca: yup
          .string("Erro: Insira o nome da crianca")
          .required("Insira o nome da crianca"),
        genero: yup
          .string("Erro: Escolhe uma opção")
          .required("Escolhe uma opção"),
        email: yup
          .string()
          .email("Insira o seu email")
          .required("Insira o seu email"),
        idade: yup
          .string("Erro: Insira a idade da criança")
          .required("Insira a idade da criança"),
        descricaoDaNecessidadeEspecial: yup
          .string("Erro: Insira a descricao da necessidade especial")
          .required("Insira a descricao da necessidade especial"),
        telefone: yup
          .string("Insira o seu telefone")
          .required("Insira o seu telefone"),
        possuiNecessidadeEspecial: yup
          .string("Erro: Escolhe uma opção")
          .required("Escolhe uma opção"),
        /* BIDoEncarregado: yup.mixed().test("BIDoEncarregado", "Ficheiro obrigatório", (value) => {
        return value && value.length > 0;
      }),
      cedulaDeNascimentoDaCrianca: yup.mixed().test("cedulaDeNascimentoDaCrianca", "Ficheiro obrigatório", (value) => {
        return value && value.length > 0;
      }),
      declaracaoTrabalho: yup.mixed().test("declaracaoTrabalho", "Ficheiro obrigatório", (value) => {
        return value && value.length > 0;
      }), */
      });



      await schema.validate(req.body, { abortEarly: false });

     
      if (
        req.files &&
        req.files["BIDoPai"] &&
        req.files["BIDoPai"].length > 0 &&
        req.files["BIDaMae"] &&
        req.files["BIDaMae"].length > 0 &&
        req.files["cedulaDeNascimentoDaCrianca"] &&
        req.files["cedulaDeNascimentoDaCrianca"].length > 0 &&
        req.files["declaracaoTrabalho"] &&
        req.files["declaracaoTrabalho"].length > 0
      ) {
        const newInscricao = await Inscricao.create({
          nomeDoPai: req.body.nomeDoPai,
          nomeDaMae: req.body.nomeDaMae,
          nomeDaCrianca: req.body.nomeDaCrianca,
          email: req.body.email,
          genero: req.body.genero,
          idade: req.body.idade,
          telefone: req.body.telefone,
          descricaoDaNecessidadeEspecial:
            req.body.descricaoDaNecessidadeEspecial,
          possuiNecessidadeEspecial: req.body.possuiNecessidadeEspecial,
          BIDoPai: req.files["BIDoPai"][0].path,
          BIDaMae: req.files["BIDaMae"][0].path,
          cedulaDeNascimentoDaCrianca:
            req.files["cedulaDeNascimentoDaCrianca"][0].path,
          declaracaoTrabalho: req.files["declaracaoTrabalho"][0].path,
          estado: false,
          // Outros campos de usuário, se houverem
        });

        res.status(200).json({ newInscricao });
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
router.get("/inscricao", async (req, res) => {
  //Receber o número da página, quando não é enviado o número da página é atribuido
  // a página 1
  const { page } = req.query;
 // console.log(page);

  //recuperar todos os usuários do banco de dados
  const inscricao = await Inscricao.findAll({
    // Ordenar os registros pela coluna id na forma decrescente
    //order: [['id', 'ASC']]
    attributes: [
      "id",
      "nomeDoPai",
      "nomeDaMae",
      "nomeDaCrianca",
      "email",
      "genero",
      "idade",
      "telefone",
      "descricaoDaNecessidadeEspecial",
      "possuiNecessidadeEspecial",
      "BIDoPai",
      "BIDaMae",
      "cedulaDeNascimentoDaCrianca",
      "declaracaoTrabalho",
      "estado",
      "createdAt",
      "updatedAt",
    ],
  });

  if (inscricao) {
    return res.json({
      inscricao,
    });
  } else {
    return res.status(400).json({
      mensagem: "Erro: Não Possui Nenhuma inscricao",
    });
  }
});

// Criar rota Visualizar e receber o parâmetro id enviado na url
router.get("/inscricao/:id", async (req, res) => {
  // Receber o parâmetro enviado na URL
  const { id } = req.params;
  //console.log(id);

  // Verifique se tem uma inscricao com o id especificado existe
  const existingInscricao = await Inscricao.findByPk(id);

  if (!existingInscricao) {
    return res.status(404).json({ mensagem: "Inscrição não encontrada" });
  }

  //Recuperar o registo do banco de dados
  const inscricao = await Inscricao.findOne({
    // Indicar quais colunas recuperar
    attributes: [
      "id",
      "nomeDoPai",
      "nomeDaMae",
      "nomeDaCrianca",
      "email",
      "genero",
      "idade",
      "telefone",
      "descricaoDaNecessidadeEspecial",
      "possuiNecessidadeEspecial",
      "BIDoPai",
      "BIDaMae",
      "cedulaDeNascimentoDaCrianca",
      "declaracaoTrabalho",
      "estado",
      "createdAt",
      "updatedAt",
    ],

    //Acrescentar a condição de qual registro deve ser retornado do banco de dados
    where: { id },
  });
  //console.log(usuario);

  if (inscricao) {
    // Pausar o processamento e retornar os dados
    return res.json({
      inscricao: inscricao.dataValues,
    });
  } else {
    // Pausar o processamento e retornar a mensagem de erro
    return res.status(400).json({
      mensagem: "Inscrição não encontrada",
    });
  }
});


// Rota de edição
router.put("/inscricao/:id", async (req, res) => {
  try {
    // Receba os dados enviados no corpo da requisição
    const dados = req.body;

    // Obtenha o ID do usuário a ser editado da URL
    const inscricaoId = req.params.id;

    // Verifique se o usuário com o ID especificado existe
    const existingInscricao = await Inscricao.findByPk(inscricaoId);

    if (!existingInscricao) {
      return res.status(404).json({ mensagem: "Inscrição não encontrada" });
    }

    // Atualize os dados no banco de dados
    await Inscricao.update(dados, { where: { id: inscricaoId } });

    return res.status(200).json({ mensagem: "Inscrição editada com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ mensagem: "Erro: Inscrição não editada!" });
  }
});

// Rota de exclusão
router.delete("/inscricao/:id", async (req, res) => {
  try {
    // Receba o ID do usuário a ser apagado da URL
    const { id } = req.params;

    // Verifique se o usuário com o ID especificado existe
    const existingInscricao = await Inscricao.findByPk(id);

    if (!existingInscricao) {
      return res.status(404).json({ mensagem: "Inscrição não encontrada" });
    }

    // Apague o usuário no banco de dados
    await Inscricao.destroy({ where: { id } });

    return res.json({ mensagem: "Inscrição apagada com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ mensagem: "Erro: Inscrição não apagada" });
  }

  
});


// rota estado
router.put("/actualizar_inscricao/:id", async (req, res) => {
  try {
    // Receba o ID da inscrição e o novo estado da URL e do corpo da requisição
    const { id } = req.params;
    const { estado } = req.body; // Adicione outros campos aqui se necessário

    // Verifique se a inscrição com o ID especificado existe
    const existingInscricao = await Inscricao.findByPk(id);

    if (!existingInscricao) {
      return res.status(404).json({ mensagem: "Inscrição não encontrada" });
    }

    // Atualize o estado da inscrição no banco de dados
    await existingInscricao.update({ estado: estado }); // Atualize outros campos aqui se necessário

    return res.json({ mensagem: "Estado da inscrição atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ mensagem: "Erro ao atualizar o estado da inscrição" });
  }
});
// Exportar a instrução que está dentro da costante router
module.exports = router;
