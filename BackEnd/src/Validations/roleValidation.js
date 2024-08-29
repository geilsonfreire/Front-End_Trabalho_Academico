const { body } = require('express-validator');

const roleValidation = [
    body('nome')
        .notEmpty().withMessage('O nome da role é obrigatório.')
        .isLength({ max: 50 }).withMessage('O nome da role não pode ter mais que 50 caracteres.'),
];

module.exports = roleValidation;