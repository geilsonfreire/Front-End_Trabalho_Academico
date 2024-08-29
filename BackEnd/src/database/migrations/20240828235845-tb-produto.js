'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Produto', {
            id_produto: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nome: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            descricao: {
                type: Sequelize.TEXT
            },
            preco_compra: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            preco_venda: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            unidade_de_medida: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            id_categoria: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Categoria',
                    key: 'id_categoria'
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Produto');
    }
};
