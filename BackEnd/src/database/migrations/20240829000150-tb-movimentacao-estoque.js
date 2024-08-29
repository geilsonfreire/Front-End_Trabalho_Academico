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
                type: Sequelize.STRING(10),
                allowNull: false,
                validate: {
                    isIn: [['entrada', 'saida']]
                }
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