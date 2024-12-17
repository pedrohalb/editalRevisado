const mysql = require('mysql2');

// Configuração da conexão
const connection = mysql.createPool({
  host: 'localhost',        // Host do MySQL
  user: 'teste',          // Seu usuário MySQL
  password: 'Senha@12345',     // Sua senha MySQL
  database: 'edital_db',   // Nome do banco de dados
});

// Exporta a conexão usando Promises
module.exports = connection.promise();
