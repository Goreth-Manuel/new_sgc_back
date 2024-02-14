const express = require("express");
const { compare } = require("bcryptjs");
const router = express.Router();
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
const initUsuarioModel = require("../db/models/user");
const { verify } = require("jsonwebtoken");
const config = require("../db/config/config");
const yup = require("yup");

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

const User = initUsuarioModel(sequelize);

router.post("/register", async (req, res) => {
  // Validar os dados enviados pelo formulário
  const schema = yup.object().shape({
    nome: yup.string("Erro: Insira o seu nome").required("Insira o seu nome"),
    senha: yup
      .string("Erro: Insira a sua senha")
      .required("Insira a sua senha"),
    email: yup
      .string()
      .email("Insira o seu email")
      .required("Insira o seu email"),
    perfil: yup
    .string()
    .nullable()
  });

  try {
    await schema.validate(req.body);
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error.errors, // Corrigido para error.errors
    });
  }

  try {
    const { nome, email, senha, perfil } = req.body;

    // Verifique se o email já está em uso
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "O email já está em uso" });
    }

    // Hash a senha antes de armazená-la no banco de dados
    const hashedSenha = await hash(senha, 10);

    // Crie um novo usuário
    const newUser = await User.create({
      nome,
      email,
      senha: hashedSenha,
      perfil,
      // Outros campos de usuário, se houverem
    });

    // Gere um token JWT para o novo usuário
    const token = sign({ id: newUser.id }, process.env.SECRET_JWT, {
      expiresIn: 3600, // Tempo de expiração do token em segundos
    });

    res.json({ newUser, auth: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error});
  }
});

router.post("/login", async (req, res) => {
  // Validar os dados enviados pelo formulário
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Insira o seu email")
      .required("Insira o seu email"),
    senha: yup
      .string("Erro: Insira a sua senha")
      .required("Insira a sua senha"),
  });

  try {
    const isValid = await schema.validate(req.body);
    if (!isValid)
      return res.status(400).json({
        error: true,
        message: error.errors,
      });

    const { email, senha } = req.body;
    const usuario = await User.findOne({
      where: { email },
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado.!" });
    }

    const senhaUsuario = await compare(senha, usuario.senha.toString());

    if (!senhaUsuario) {
      return res.status(400).json({ error: "Senha incorrecta" });
    }

    const token = sign({ id: usuario.id }, process.env.SECRET_JWT, {
      expiresIn: 3600,
    });

    return res.json({ auth: true, token, username: usuario.nome });
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ message: "internal server error", error: err });
  }
});

router.get("/userMe", async (req, res) => {
  try {
    // Recupere informações do usuário autenticado, se houver um token válido no cabeçalho da solicitação
    const token = req.header("x-auth-token");

    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    // Verifique o token JWT e decodifique as informações do usuário
    const decoded = verify(token, process.env.SECRET_JWT);

    if (!decoded) {
      return res.status(401).json({ message: "Token inválido" });
    }

    const userId = decoded.id;

    // Consulte o banco de dados para obter informações do usuário
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["senha"] },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Retorne as informações do usuário (você pode escolher quais informações deseja retornar)
    res.json({ user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar informações do usuário" });
  }
});

module.exports = router;
