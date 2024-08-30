const { body } = require('express-validator');

const estoqueValidation = [
    body('id_produto')
        .notEmpty().withMessage('O ID do produto é obrigatório.')
        .isInt().withMessage('O ID do produto deve ser um número inteiro.'),
    body('quantidade_minima')
        .notEmpty().withMessage('A quantidade mínima é obrigatória.')
        .isInt({ gt: 0 }).withMessage('A quantidade mínima deve ser um número inteiro maior que 0.'),
    body('quantidade_atual')
        .notEmpty().withMessage('A quantidade atual é obrigatória.')
        .isInt({ gt: 0 }).withMessage('A quantidade atual deve ser um número inteiro maior que 0.'),
];

module.exports = estoqueValidation;