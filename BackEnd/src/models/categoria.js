'use strict';
module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define('Categoria', {
        id_categoria: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'Categoria',
        timestamps: false
    });

    Categoria.associate = function (models) {
        Categoria.hasMany(models.Produto, {
            foreignKey: 'id_categoria',
            as: 'produtos',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        });
    };

    return Categoria;
};