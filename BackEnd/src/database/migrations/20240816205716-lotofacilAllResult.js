'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('lotofacilAllResult', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            loteria: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            concurso: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },
            data: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            local: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            time_coracao: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            mes_sorte: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            observacao: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            acumulou: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
            },
            proximo_concurso: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },
            data_proximo_concurso: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            valor_arrecadado: {
                type: Sequelize.FLOAT,
                allowNull: true,
                defaultValue: 0,
            },
            valor_acumulado_concurso_0_5: {
                type: Sequelize.FLOAT,
                allowNull: true,
                defaultValue: 0,
            },
            valor_acumulado_concurso_especial: {
                type: Sequelize.FLOAT,
                allowNull: true,
                defaultValue: 0,
            },
            valor_acumulado_proximo_concurso: {
                type: Sequelize.FLOAT,
                allowNull: true,
                defaultValue: 0,
            },
            valor_estimado_proximo_concurso: {
                type: Sequelize.FLOAT,
                allowNull: true,
                defaultValue: 0,
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

        // Adicionando as foreign keys
        await queryInterface.addColumn('dezenas', 'lotofacil_all_result_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'lotofacilAllResult',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        await queryInterface.addColumn('premiacoes', 'lotofacil_all_result_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'lotofacilAllResult',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        await queryInterface.addColumn('estadosPremiados', 'lotofacil_all_result_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'lotofacilAllResult',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        await queryInterface.addColumn('localGanhadores', 'lotofacil_all_result_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'lotofacilAllResult',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        await queryInterface.addColumn('trevos', 'lotofacil_all_result_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'lotofacilAllResult',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
    },

    down: async (queryInterface, Sequelize) => {
        // Remover as foreign keys
        await queryInterface.removeColumn('dezenas', 'lotofacil_all_result_id');
        await queryInterface.removeColumn('premiacoes', 'lotofacil_all_result_id');
        await queryInterface.removeColumn('estadosPremiados', 'lotofacil_all_result_id');
        await queryInterface.removeColumn('localGanhadores', 'lotofacil_all_result_id');
        await queryInterface.removeColumn('trevos', 'lotofacil_all_result_id');

        // Excluir a tabela 'lotofacilAllResult'
        await queryInterface.dropTable('lotofacilAllResult');
    }
};
