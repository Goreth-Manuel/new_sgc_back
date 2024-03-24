const {Sequelize }= require("sequelize");
const dbConfig = require("./config/config");

const Matricula = require("./models/matriculaModels");
const Inscricao = require("./models/inscricaoModels");
const Sala = require("./models/sala");
const Serie = require("./models/serie");
const Seccao = require("./models/seccao");
const connection = new Sequelize(dbConfig);

//conection
Matricula.init(connection);
Serie.init(connection);
Inscricao.init(connection);
Sala.init(connection);
Seccao.init(connection);

//association
Matricula.associate(connection.models);
Serie.associate(connection.models);
Inscricao.associate(connection.models);
Sala.associate(connection.models);
Seccao.associate(connection.models);


module.exports = connection;