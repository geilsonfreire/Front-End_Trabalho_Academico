const { body, validationResult } = require('express-validator');

const usuarioValidation = [
    body('nome').optional().notEmpty().withMessage('O nome do usuário é obrigatório.'),
    body('email').optional().isEmail().withMessage('O e-mail deve ser válido.'),
    body('senha').optional().isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres.')
];

module.exports = usuarioValidation;