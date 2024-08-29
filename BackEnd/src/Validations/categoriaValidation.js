const { body, param } = require('express-validator');

exports.createCategoriaValidator = [
    body('nome')
        .isString().withMessage('Nome deve ser uma string.')
        .notEmpty().withMessage('Nome é obrigatório.')
        .isLength({ max: 50 }).withMessage('Nome deve ter no máximo 50 caracteres.')
];

exports.updateCategoriaValidator = [
    param('id')
        .isInt().withMessage('ID deve ser um número inteiro.'),
    body('nome')
        .optional()
        .isString().withMessage('Nome deve ser uma string.')
        .isLength({ max: 50 }).withMessage('Nome deve ter no máximo 50 caracteres.')
];
