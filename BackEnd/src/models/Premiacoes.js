const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Premiacoes = sequelize.define('premiacoes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    faixa: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    ganhadores: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    valor_premio: {
        type: DataTypes.FLOAT,
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
}, {
    tableName: 'premiacoes',
    timestamps: true,
});

module.exports = Premiacoes;