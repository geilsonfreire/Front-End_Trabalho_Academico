const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Trevos = sequelize.define('trevos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    trevo: {
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

module.exports = Trevos;