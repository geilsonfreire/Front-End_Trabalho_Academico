'use strict';
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        id_role: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'Role',
        timestamps: false
    });

    Role.associate = function (models) {
        Role.belongsToMany(models.Usuario, {
            through: models.UsuarioRole, // Referência direta ao modelo UsuarioRole
            foreignKey: 'id_role',
            otherKey: 'id_usuario',
            as: 'usuarios',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };

    return Role;
};