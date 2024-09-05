const { Role, Usuario, UsuarioRole } = require('../models');
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

            // Criar o role
            const role = await Role.create(req.body);

            // Criar a associação na tabela UsuarioRole para todos os usuários existentes
            const usuarios = await Usuario.findAll();
            for (const usuario of usuarios) {
                await UsuarioRole.create({
                    id_usuario: usuario.id_usuario,
                    id_role: role.id_role
                });
            }

            res.status(201).json(role);
        } catch (error) {
            console.error('Erro ao criar role:', error);
            res.status(400).json({ error: 'Erro ao criar role.', message: error.message });
        }
    }
];

// Função para obter todos os roles
exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (error) {
        console.error('Erro ao obter roles:', error);
        res.status(400).json({ error: error.message });
    }
};

// Função para obter um role pelo id
exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (role) {
            res.status(200).json(role);
        } else {
            res.status(404).json({ error: 'Role não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao obter role:', error);
        res.status(400).json({ error: error.message });
    }
};

// Função para atualizar um role
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
            console.error('Erro ao atualizar role:', error);
            res.status(400).json({ error: error.message });
        }
    }
];

// Função para deletar um role
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
        console.error('Erro ao deletar role:', error);
        res.status(400).json({ error: error.message });
    }
};