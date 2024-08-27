const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Premiacoes = require('./Premiacoes');
const LocalGanhadores = require('./LocalGanhadores');
const EstadosPremiados = require('./EstadosPremiados');
const Dezenas = require('./Dezenas');
const Trevos = require('./Trevos');

const LotofacilAllResult = sequelize.define('lotofacilAllResult', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    loteria: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    concurso: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    data: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    local: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    time_coracao: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    mes_sorte: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    observacao: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    acumulou: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    proximo_concurso: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    data_proximo_concurso: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    valor_arrecadado: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    valor_acumulado_concurso_0_5: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    valor_acumulado_concurso_especial: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    valor_acumulado_proximo_concurso: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    valor_estimado_proximo_concurso: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
}, {
    tableName: 'lotofacilAllResult',
    timestamps: true,
});

// Relacionamento entre tabelas
LotofacilAllResult.hasMany(Dezenas, { foreignKey: 'lotofacil_all_result_id' });
LotofacilAllResult.hasMany(Premiacoes, { foreignKey: 'lotofacil_all_result_id' });
LotofacilAllResult.hasMany(EstadosPremiados, { foreignKey: 'lotofacil_all_result_id' });
LotofacilAllResult.hasMany(LocalGanhadores, { foreignKey: 'lotofacil_all_result_id' });
LotofacilAllResult.hasMany(Trevos, { foreignKey: 'lotofacil_all_result_id' });

module.exports = LotofacilAllResult;