const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const EstadosPremiados = sequelize.define('estadosPremiados', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
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
    tableName: 'estadosPremiados',
    timestamps: false,
});


module.exports = EstadosPremiados;
