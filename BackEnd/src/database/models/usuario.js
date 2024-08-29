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

    return Usuario;
};