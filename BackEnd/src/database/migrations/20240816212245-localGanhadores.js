'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('localGanhadores', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            ganhadores: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            municipio: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            nome_fantasia_ul: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            serie: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: 0,
            },
            posicao: {
                type: Sequelize.INTEGER,
                allowNull: true,
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
        await queryInterface.dropTable('localGanhadores');
    }
};
