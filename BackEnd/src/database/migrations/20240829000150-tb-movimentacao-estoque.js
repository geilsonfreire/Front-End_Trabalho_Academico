'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('MovimentacaoEstoque', {
            id_movimentacao: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            data_movimentacao: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            quantidade: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            tipo_movimentacao: {
                type: Sequelize.ENUM('Entrada', 'Saida'), // Correção para ENUM com valores em maiúsculas
                allowNull: false
            },
            id_estoque: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Estoque',
                    key: 'id_estoque'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            id_produto: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Produto',
                    key: 'id_produto'
                },
                onDelete: 'CASCADE',
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
        await queryInterface.dropTable('MovimentacaoEstoque');
    }
};