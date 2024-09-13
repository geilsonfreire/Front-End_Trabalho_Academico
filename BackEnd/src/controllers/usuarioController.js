// Import bibliotecas 
const bcrypt = require('bcrypt');

// Importar models
const { Usuario, UsuarioRole, Role } = require('../models');

// Importar validações
const { validationResult } = require('express-validator');
const usuarioValidation = require('../validations/usuarioValidation');

// Função para criptografar a senha
const hashSenha = async (senha) => {
    const saltRounds = 10;
    const hashedSenha = await bcrypt.hash(senha, saltRounds);
    return hashedSenha;
};

exports.createUsuario = [
    usuarioValidation,
    async (req, res) => {
        try {
            // Verificar se há erros de validação
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Criptografar a senha antes de salvar
            const senhaCriptografada = await hashSenha(req.body.senha);

            // Criar o usuário com a senha criptografada
            const usuario = await Usuario.create({
                ...req.body,
                senha: senhaCriptografada
            });
            
            // Verificar se o id_role está presente
            if (req.body.id_role) {
                // Criar a associação na tabela UsuarioRole
                await UsuarioRole.create({
                    id_usuario: usuario.id_usuario,
                    id_role: req.body.id_role
                });
            }

            res.status(201).json(usuario);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            res.status(400).json({ error: 'Erro ao criar usuário.', message: error.message });
        }
    }
];


// Função para obter todos os usuários com seus papéis (roles)
exports.getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            include: [
                {
                    model: Role,
                    as: 'roles', // Nome do relacionamento definido no modelo
                    attributes: ['nome'] // Campos que deseja incluir da tabela Role
                }
            ]
        });

        // Formatando a resposta para incluir apenas o array de nomes dos papéis
        const usuariosComRoles = usuarios.map(usuario => ({
            id: usuario.id_usuario,
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha,
            status: usuario.status,
            roles: usuario.roles.map(role => role.nome) // Obtendo apenas o nome dos papéis
        }));

        res.status(200).json(usuariosComRoles);
    } catch (error) {
        console.error('Erro ao obter usuários:', error);
        res.status(400).json({ error: error.message });
    }
};

// Verificar se há erros de validação
exports.getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao obter usuário:', error);
        res.status(400).json({ error: error.message });
    }
};

// Função para atualizar um usuário
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
                // Se a senha estiver presente na requisição, criptografar antes de atualizar
                if (req.body.senha) {
                    req.body.senha = await hashSenha(req.body.senha);
                }
                // Atualizar os dados do usuário
                await usuario.update(req.body);
                res.status(200).json(usuario);
            } else {
                res.status(404).json({ error: 'Usuário não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            res.status(400).json({ error: error.message });
        }
    }
];

// Função para deletar um usuário
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
        console.error('Erro ao deletar usuário:', error);
        res.status(400).json({ error: error.message });
    }
};