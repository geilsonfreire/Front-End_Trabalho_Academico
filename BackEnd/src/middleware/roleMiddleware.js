const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        const { roles } = req.user;

        if (!roles || !roles.includes(requiredRole)) {
            return res.status(403).json({ error: 'Acesso negado. Permissão insuficiente.' });
        }

        next(); // Continua para a próxima função de middleware ou rota
    };
};

module.exports = roleMiddleware;