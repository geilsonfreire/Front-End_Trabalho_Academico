'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('dezenas', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            dezenas_ordem_sorteio: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            dezenas: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            lotofacil_all_result_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'lotofacilAllResult', // Nome da tabela referenciada
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('dezenas');
    }
};
