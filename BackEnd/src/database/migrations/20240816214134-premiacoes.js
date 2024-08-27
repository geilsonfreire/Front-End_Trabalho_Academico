'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('premiacoes', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            descricao: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            faixa: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },
            ganhadores: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },
            valor_premio: {
                type: Sequelize.FLOAT,
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
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('premiacoes');
    }
};
