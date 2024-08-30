const { UsuarioRole, Usuario, Role } = require('../models');
const { validationResult } = require('express-validator');
const usuarioRoleValidation = require('../validations/usuarioRoleValidation');

// Associa um usuário a um role
exports.associateUsuarioRole = [
    usuarioRoleValidation,
    async (req, res) => {
        try {
            // Verificar se há erros de validação
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id_usuario, id_role } = req.body;

            // Verificar se o usuário e o role existem
            const usuario = await Usuario.findByPk(id_usuario);
            const role = await Role.findByPk(id_role);

            if (!usuario || !role) {
                return res.status(404).json({ error: 'Usuário ou role não encontrado.' });
            }

            // Criar a associação
            const usuarioRole = await UsuarioRole.create({ id_usuario, id_role });
            res.status(201).json(usuarioRole);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao associar usuário e role.', message: error.message });
        }
    }
];

// Retorna todos os roles associados a um usuário
exports.getRolesByUsuario = async (req, res) => {
    try {
        const roles = await UsuarioRole.findAll({
            where: { id_usuario: req.params.id_usuario },
        });
        if (roles.length === 0) {
            return res.status(404).json({ message: 'Nenhum role encontrado para este usuário.' });
        }
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove a associação entre um usuário e um role
exports.deleteUsuarioRole = [
    usuarioRoleValidation,
    async (req, res) => {
        try {
            // Verificar se há erros de validação
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id_usuario, id_role } = req.body;

            // Verificar se a associação existe
            const usuarioRole = await UsuarioRole.findOne({
                where: { id_usuario, id_role },
            });

            if (!usuarioRole) {
                return res.status(404).json({ error: 'Relação de usuário e role não encontrada.' });
            }

            // Remover a associação
            await usuarioRole.destroy();
            res.status(204).json(); // Sem conteúdo
        } catch (error) {
            res.status(500).json({ error: 'Erro ao remover associação.', message: error.message });
        }
    }
];