const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { usuario, role } = require('../models');

// Função de login
exports.login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await usuario.findOne({
            where: { email },
            include: {
                model: role,
                as: 'roles',
                attributes: ['nome'],
                through: { attributes: [] }
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        const isPasswordValid = bcrypt.compareSync(senha, user.senha);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha inválida.' });
        }

        const roles = user.roles.map(role => role.nome);

        const token = jwt.sign(
            { id_usuario: user.id_usuario, email: user.email, roles },
            process.env.SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, message: 'Usuário autenticado.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao autenticar o usuário' });
    }
};

// Função de verificação de autenticação
exports.checkAuth = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ isAuthenticated: false });

        jwt.verify(token, process.env.SECRET);
        res.status(200).json({ isAuthenticated: true });
    } catch (error) {
        res.status(401).json({ isAuthenticated: false });
    }
};

// Função para obter informações do usuário
exports.getUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await usuario.findByPk(decoded.id_usuario, {
            include: {
                model: role,
                as: 'roles',
                attributes: ['nome'],
                through: { attributes: [] }
            }
        });

        if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};