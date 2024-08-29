const { Role } = require('../models');
const { validationResult } = require('express-validator');
const roleValidation = require('../validations/roleValidation');

exports.createRole = [
    roleValidation,
    async (req, res) => {
        try {
            // Verificar se há erros de validação
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Criar o papel
            const role = await Role.create(req.body);
            res.status(201).json(role);
        } catch (error) {
            res.status(400).json({ error: 'Erro ao criar role.', message: error.message });
        }
    }
];

exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (role) {
            res.status(200).json(role);
        } else {
            res.status(404).json({ error: 'Role não encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateRole = [
    roleValidation,
    async (req, res) => {
        try {
            // Verificar se há erros de validação
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const role = await Role.findByPk(req.params.id);
            if (role) {
                await role.update(req.body);
                res.status(200).json(role);
            } else {
                res.status(404).json({ error: 'Role não encontrada' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

exports.deleteRole = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (role) {
            await role.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Role não encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};