### npm init

instalação de forma global no prompt de comando
### npm install -g nodemon
### npm install --save-dev nodemon

instalação do mysql2
### npm install --save mysql2

### npm install --save sequelize

### npm install --save-dev sequelize-cli 

### npx sequelize-cli init

### npm install dotenv --save 

Criar migration
### npx sequelize-cli migration:generate --name create-usuarios

Executar as migrations. Trabalhar com migrations permite ter o versionamento do banco de dados
### npx sequelize-cli db:migrate

Criar a Models usuarios
### npx sequelize-cli model:generate --name Usuario --attributes name:string, email:string, senha:string

Instalar o módulo para criptografar a senha
### npm install --save bcryptjs

Instalar a dependência para JWT
### npm install --save jsonwebtoken

Instalar o cors que permite fazer a requisição externa
### npm install cors

### npx sequelize-cli db:migrate:undo:all

### npx sequelize-cli db:migrate:undo 