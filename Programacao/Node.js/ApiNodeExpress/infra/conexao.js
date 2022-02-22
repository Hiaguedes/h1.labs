const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: 'localhost',
    password: 'admin',
    database: 'agenda-petshop',
    user: 'hiago',
});

module.exports = conexao;