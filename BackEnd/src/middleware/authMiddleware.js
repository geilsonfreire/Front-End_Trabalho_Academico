const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido', error: error.message });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await Usuario.findByPk(decoded.id_usuario);

        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        req.user = user; // Adiciona o usuário ao req
        req.user.roles = decoded.roles || []; // Adiciona os roles decodificados
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = authMiddleware;