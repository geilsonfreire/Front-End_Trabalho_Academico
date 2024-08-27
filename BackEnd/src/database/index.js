const Sequelize = require('sequelize');
const dbConfig = require('../config/config');

const connection = new Sequelize(dbConfig);

module.exports = connection; // Exporta a conexão com o banco de dados para ser utilizada em outros arquivos