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
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                isIn: [['entrada', 'saida']]
            }
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
        MovimentacaoEstoque.belongsTo(models.Produto, {
            foreignKey: 'id_produto',
            as: 'produto',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };

    return MovimentacaoEstoque;
};