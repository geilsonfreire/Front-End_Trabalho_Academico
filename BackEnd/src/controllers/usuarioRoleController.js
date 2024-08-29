const { UsuarioRole } = require('../models');
const { validationResult } = require('express-validator');
const usuarioRoleValidation = require('../validations/usuarioRoleValidation');

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
            const usuarioRole = await UsuarioRole.create({ id_usuario, id_role });
            res.status(201).json(usuarioRole);
        } catch (error) {
            res.status(400).json({ error: 'Erro ao associar usuário e role.', message: error.message });
        }
    }
];

exports.getRolesByUsuario = async (req, res) => {
    try {
        const roles = await UsuarioRole.findAll({
            where: { id_usuario: req.params.id_usuario },
        });
        res.status(200).json(roles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUsuarioRole = [
    usuarioRoleValidation,
    async (req, res) => {
        try {
            // Verificar se há erros de validação
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id_usuario, id_role } = req.params;
            const usuarioRole = await UsuarioRole.findOne({
                where: { id_usuario, id_role },
            });
            if (usuarioRole) {
                await usuarioRole.destroy();
                res.status(204).json();
            } else {
                res.status(404).json({ error: 'Relação de usuário e role não encontrada' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];