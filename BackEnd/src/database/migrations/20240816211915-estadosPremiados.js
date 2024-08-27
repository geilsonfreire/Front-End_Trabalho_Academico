'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('estadosPremiados', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            uf: {
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
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('estadosPremiados');
    }
};