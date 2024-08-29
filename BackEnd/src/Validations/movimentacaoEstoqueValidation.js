const { body } = require('express-validator');

const movimentacaoEstoqueValidation = [
    body('tipo')
        .isIn(['Entrada', 'Saída']).withMessage('O tipo deve ser "Entrada" ou "Saída".'),
    body('quantidade')
        .isInt({ gt: 0 }).withMessage('A quantidade deve ser um número inteiro maior que 0.'),
    body('id_estoque')
        .notEmpty().withMessage('O ID do estoque é obrigatório.')
        .isInt().withMessage('O ID do estoque deve ser um número inteiro.'),
];

module.exports = movimentacaoEstoqueValidation;