const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const LocalGanhadores = sequelize.define('localGanhadores', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    ganhadores: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    municipio: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nome_fantasia_ul: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    serie: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 0,
    },
    posicao: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    uf: {
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
    }
}, {
    tableName: 'localGanhadores',
    timestamps: true,
});

module.exports = LocalGanhadores;