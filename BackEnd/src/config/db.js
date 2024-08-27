const { Sequelize } = require('sequelize');
const config = require('./config'); // Ajuste o caminho se necessário

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    define: config.define,
});

module.exports = sequelize;