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

    // Hook to create UsuarioRole for each user after a new role is created
    Role.afterCreate(async (role, options) => {
        try {
            const Usuario = sequelize.models.Usuario;
            const UsuarioRole = sequelize.models.UsuarioRole;

            const usuarios = await Usuario.findAll();

            for (const usuario of usuarios) {
                await UsuarioRole.create({
                    id_usuario: usuario.id_usuario,
                    id_role: role.id_role
                });
            }
        } catch (error) {
            console.error('Erro ao associar todos os usuários ao novo role:', error);
        }
    });

    return Role;
};