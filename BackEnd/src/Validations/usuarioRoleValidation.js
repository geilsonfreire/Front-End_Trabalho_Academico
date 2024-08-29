const { body } = require('express-validator');

const usuarioRoleValidation = [
    body('id_usuario')
        .notEmpty().withMessage('O ID do usuário é obrigatório.')
        .isInt().withMessage('O ID do usuário deve ser um número inteiro.'),
    body('id_role')
        .notEmpty().withMessage('O ID da role é obrigatório.')
        .isInt().withMessage('O ID da role deve ser um número inteiro.'),
];

module.exports = usuarioRoleValidation;