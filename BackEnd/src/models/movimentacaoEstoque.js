'use strict';
module.exports = (sequelize, DataTypes) => {
    const MovimentacaoEstoque = sequelize.define('MovimentacaoEstoque', {
        id_movimentacao: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        data_movimentacao: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tipo_movimentacao: {
            type: DataTypes.ENUM('Entrada', 'Saida'), // Correção para ENUM com valores em maiúsculas
            allowNull: false
        },
        id_estoque: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Estoque',
                key: 'id_estoque'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        id_produto: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Produto',
                key: 'id_produto'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    }, {
        tableName: 'MovimentacaoEstoque',
        timestamps: false
    });

    MovimentacaoEstoque.associate = function (models) {
        MovimentacaoEstoque.belongsTo(models.Estoque, {
            foreignKey: 'id_estoque',
            as: 'estoque',
            onDelete: 'CASCADE'
        });
        MovimentacaoEstoque.belongsTo(models.Produto, {
            foreignKey: 'id_produto',
            as: 'produto',
            onDelete: 'CASCADE'
        });
    };

    return MovimentacaoEstoque;
};