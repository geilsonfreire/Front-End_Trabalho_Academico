const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_DATABASE,  // Nome do banco de dados
    process.env.DB_USER,      // Usuário do banco de dados
    process.env.DB_PASSWORD,  // Senha do banco de dados
    {
        host: process.env.DB_HOST,          // Host do banco de dados
        dialect: process.env.DB_DIALECT,    // Dialeto do banco de dados
        port: process.env.DB_PORT,           // Porta do banco de dados
        define: {
            timestamps: true,     // Habilita timestamps
            underscored: true,    // Utiliza nomes de colunas com underscore
        },
    }
);

// Exporta a instância do Sequelize e o SECRET
module.exports = {
    sequelize,
    secret: process.env.SECRET
};

// Exporta a instância do Sequelize
module.exports = sequelize;