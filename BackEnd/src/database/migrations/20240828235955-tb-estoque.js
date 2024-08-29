'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Estoque', {
            id_produto: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: 'Produto',
                    key: 'id_produto'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            quantidade_minima: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            quantidade_atual: {
                type: Sequelize.INTEGER,
                allowNull: false
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
        await queryInterface.dropTable('Estoque');
    }
};