'use strict';
module.exports = (sequelize, DataTypes) => {
    const Produto = sequelize.define('Produto', {
        id_produto: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        descricao: {
            type: DataTypes.TEXT
        },
        preco_compra: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        preco_venda: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        unidade_de_medida: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        id_categoria: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Categoria',
                key: 'id_categoria'
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }
    }, {
        tableName: 'Produto',
        timestamps: true, // Adiciona os campos `createdAt` e `updatedAt`
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    Produto.associate = function (models) {
        Produto.belongsTo(models.Categoria, {
            foreignKey: 'id_categoria',
            as: 'categoria',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        });
        Produto.hasOne(models.Estoque, {
            foreignKey: 'id_produto',
            as: 'estoque',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        Produto.hasMany(models.MovimentacaoEstoque, {
            foreignKey: 'id_produto',
            as: 'movimentacoes',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };

    return Produto;
};