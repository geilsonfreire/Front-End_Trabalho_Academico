const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Usuario, Role } = require('../models');
const { Op } = require('sequelize');


// Função para verificar a senha
const verificarSenha = async (senhaInserida, senhaArmazenada) => {
    return bcrypt.compare(senhaInserida, senhaArmazenada);
};

// Função de login
exports.login = async (req, res) => {
    const { emailOrUsername, senha } = req.body;

    try {
        console.log('emailOrUsername:', emailOrUsername);
        const user = await Usuario.findOne({
            where: {
                [Op.or]: [
                    { email: emailOrUsername },
                    { nome: emailOrUsername }
                ]
            },
            include: {
                model: Role,
                as: 'roles',
                attributes: ['nome'],
                through: { attributes: [] }
            },
        });

        // Verificar se o usuário existe    
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        

        // Verificar se a senha é válida
        const isPasswordValid = await verificarSenha(senha, user.senha);

        // Se a senha não for válida, retornar um erro
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha inválida.' });
        }

        // Gerar o token jwt
        const roles = user.roles.map(role => role.nome);
        const token = jwt.sign(
            { 
                id_usuario: user.id_usuario, 
                email: user.email, 
                roles 
            },
            process.env.SECRET,
            { expiresIn: '1h' }
        );

        // Retornar token e dados do usuário
        return res.status(200).json({
            message: 'Usuário autenticado',
            token: token,
            user: {
                id: user.id_usuario,    
                email: user.email,
                roles: roles 
            }
        });
    } catch (error) {
        console.error('Erro ao autenticar o usuário:', error.message, error.stack);
        res.status(500).json({ message: 'Erro ao autenticar o usuário', error: error.message });
    }
};

// Função de verificação de autenticação
exports.checkAuth = async (req, res) => {
    try {
        // Verificar se o token está presente no cabeçalho
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) 
            return res.status(401).json({ isAuthenticated: false });
        // Verificar se o token é válido
        const decoded = jwt.verify(token, process.env.SECRET);
        res.status(200).json({ isAuthenticated: true, decoded });
    } catch (error) {
        console.log('Erro ao verificar o token:', error);
        res.status(401).json({ isAuthenticated: false, message: 'Token inválido ou expirado' });
    }
};

// Função para obter informações do usuário
exports.getUser = async (req, res) => {
    try {
        // Verificar se o token está presente no cabeçalho
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) 
            return res.status(401).json({ message: 'Token não encontrado' });
        // Verificar se o token é válido
        const decoded = jwt.verify(token, process.env.SECRET);
        // Obter as informações do usuário
        const user = await Usuario.findByPk(decoded.id_usuario, {
            include: {
                model: Role,
                as: 'roles',
                attributes: ['nome'],
                through: { attributes: [] }
            }
        });

        if (!user) 
            return res.status(404).json({ error: 'Usuário não encontrado.' });

        res.status(200).json(user);
    } catch (error) {
        console.log('Erro ao obter informações do usuário:', error);
        res.status(401).json({ message: 'Token inválido' });
    }
};