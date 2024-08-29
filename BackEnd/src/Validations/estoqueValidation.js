const { body } = require('express-validator');

const estoqueValidation = [
    body('quantidade')
        .isInt({ gt: 0 }).withMessage('A quantidade deve ser um número inteiro maior que 0.'),
    body('id_produto')
        .notEmpty().withMessage('O ID do produto é obrigatório.')
        .isInt().withMessage('O ID do produto deve ser um número inteiro.'),
];

module.exports = estoqueValidation;