'use strict';
module.exports = (sequelize, DataTypes) => {
    const UsuarioRole = sequelize.define('UsuarioRole', {
        id_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Usuario',
                key: 'id_usuario'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        id_role: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Role',
                key: 'id_role'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    }, {
        tableName: 'UsuarioRole',
        timestamps: false
    });

    return UsuarioRole;
};