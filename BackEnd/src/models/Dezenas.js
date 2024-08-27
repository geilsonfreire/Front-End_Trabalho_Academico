const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Dezenas = sequelize.define('dezenas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    dezenas_ordem_sorteio: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    dezenas: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lotofacil_all_result_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'lotofacilAllResult',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
});

module.exports = Dezenas;