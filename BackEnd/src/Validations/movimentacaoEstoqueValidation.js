const { body } = require('express-validator');

const movimentacaoEstoqueValidation = [
    body('tipo_movimentacao')
        .isIn(['Entrada', 'Saida']).withMessage('O tipo deve ser "Entrada" ou "Saída".'),
    body('quantidade')
        .isInt({ gt: 0 }).withMessage('A quantidade deve ser um número inteiro maior que 0.'),
    body('data_movimentacao')
        .isISO8601().withMessage('A data deve estar no formato ISO 8601.'),
    body('id_estoque')
        .notEmpty().withMessage('O ID do estoque é obrigatório.')
        .isInt().withMessage('O ID do estoque deve ser um número inteiro.'),
    body('id_produto')
        .notEmpty().withMessage('O ID do produto é obrigatório.')
        .isInt().withMessage('O ID do produto deve ser um número inteiro.')
];

module.exports = movimentacaoEstoqueValidation;