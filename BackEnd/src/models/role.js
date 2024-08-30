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
            as: 'usuarios',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };

    Role.afterCreate(async (role, options) => {
        try {
            const usuarios = await models.Usuario.findAll();
            for (const usuario of usuarios) {
                await models.UsuarioRole.create({
                    id_usuario: usuario.id_usuario,
                    id_role: role.id_role
                });
            }
        } catch (error) {
            console.error('Erro ao associar role aos usuários existentes:', error);
        }
    });

    return Role;
};