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
                onDelete: 'CASCADE'
            },
            quantidade_minima: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            quantidade_atual: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Estoque');
    }
};