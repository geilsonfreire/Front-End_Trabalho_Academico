'use strict';
module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        id_usuario: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        senha: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true // Usuário ativo por padrão
        }
    }, {
        tableName: 'Usuario',
        timestamps: false
    });

    Usuario.associate = function (models) {
        Usuario.belongsToMany(models.Role, {
            through: 'UsuarioRole',
            foreignKey: 'id_usuario',
            as: 'roles',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };

    // Hook to create UsuarioRole after a new user is created
    Usuario.afterCreate(async (usuario, options) => {
        try {
            const UsuarioRole = sequelize.models.UsuarioRole;
            await UsuarioRole.create({
                id_usuario: usuario.id_usuario,
                id_role: usuario.id_role
            });
        } catch (error) {
            console.error('Erro ao associar o usuário ao role:', error);
        }
    });
    
    return Usuario;
};