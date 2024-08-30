'use strict';
module.exports = (sequelize, DataTypes) => {
    const Estoque = sequelize.define('Estoque', {
        id_estoque: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_produto: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Produto',
                key: 'id_produto'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        quantidade_minima: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantidade_atual: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'Estoque',
    });

    Estoque.associate = function (models) {
        Estoque.belongsTo(models.Produto, {
            foreignKey: 'id_produto',
            as: 'produto',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };

    return Estoque;
};