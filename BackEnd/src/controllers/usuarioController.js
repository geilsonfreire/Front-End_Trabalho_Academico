const { Usuario, UsuarioRole } = require('../models');
const { validationResult } = require('express-validator');
const usuarioValidation = require('../validations/usuarioValidation');

exports.createUsuario = [
    usuarioValidation,
    async (req, res) => {
        try {
            // Verificar se há erros de validação
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Criar o usuário
            const usuario = await Usuario.create(req.body);

            // Criar a associação na tabela UsuarioRole
            await UsuarioRole.create({
                id_usuario: usuario.id_usuario,
                id_role: req.body.id_role // Assumindo que o id_role é enviado na requisição
            });

            res.status(201).json(usuario);
        } catch (error) {
            res.status(400).json({ error: 'Erro ao criar usuário.', message: error.message });
        }
    }
];

exports.getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateUsuario = [
    usuarioValidation,
    async (req, res) => {
        try {
            // Verificar se há erros de validação
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const usuario = await Usuario.findByPk(req.params.id);
            if (usuario) {
                await usuario.update(req.body);
                res.status(200).json(usuario);
            } else {
                res.status(404).json({ error: 'Usuário não encontrado' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

exports.deleteUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            await usuario.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};