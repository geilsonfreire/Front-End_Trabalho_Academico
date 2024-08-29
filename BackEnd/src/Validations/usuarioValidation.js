const { body } = require('express-validator');

const usuarioValidation = [
    body('nome')
        .notEmpty().withMessage('O nome do usuário é obrigatório.')
        .isLength({ max: 50 }).withMessage('O nome não pode ter mais que 50 caracteres.'),
    body('email')
        .isEmail().withMessage('O e-mail deve ser válido.'),
    body('senha')
        .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres.'),
];

module.exports = usuarioValidation;