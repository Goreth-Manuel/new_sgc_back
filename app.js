const express = require("express");
const cors = require("cors"); // Importar a bibliotece para permitir conexão externa

const app = express();

//Criar o middleware para receber os dados no corpo da requisição
// middleware é uma instrução que é executada antes de executar a rota
app.use(express.json());

//Criar o middleware para permitir requisição externa
app.use((req, res, next) => {
  // Qualquer endereço pode fazerrequisição
  //res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Origin", "*");
  // Tipos de métodos que a API aceita
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  //Permitir o envio de dados para API
  res.header("Access-Control-Allow-Headers", "Content-Type");
  // Executar o cors

  app.use(
    cors({
      origin: "*",
    })
  );
  // Quando não houver erro deve continuar o processamento

  next();
});
// testar a conexão com o BD
//const db = require("./db/models");

// incluir os CONTRLLERS
const users = require("./controllers/users");
const authentication = require("./controllers/authentication");
const inscricao = require("./controllers/inscricaoControllers");
const matricula = require("./controllers/matriculaControllers");
const seccao = require("./controllers/seccaoControllers");
const sala = require("./controllers/salaControllers");
const serie = require("./controllers/serieControllers");

require("./db/index");

//criar as rotas
app.use("/auth", authentication);
app.use("/", users);
app.use("/", inscricao);
app.use("/", matricula);
app.use("/", seccao);
app.use("/", sala);
app.use("/", serie);

app.listen(8080, () => {
  console.log("Servidor rodando na porta 8080");
});
