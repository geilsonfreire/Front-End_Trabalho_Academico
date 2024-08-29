'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('UsuarioRole', {
            id_usuario: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: 'Usuario',
                    key: 'id_usuario'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            id_role: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: 'Role',
                    key: 'id_role'
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
        await queryInterface.dropTable('UsuarioRole');
    }
};