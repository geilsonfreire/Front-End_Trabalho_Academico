const { body } = require('express-validator');

const produtoValidation = [
    body('nome').isString().notEmpty().withMessage('O nome do produto é obrigatório.'),
    body('preco_compra').isFloat({ gt: 0 }).withMessage('O preço de compra deve ser um número positivo.'),
    body('preco_venda').isFloat({ gt: 0 }).withMessage('O preço de venda deve ser um número positivo.'),
    body('unidade_de_medida').isString().notEmpty().withMessage('A unidade de medida é obrigatória.'),
    body('id_categoria').optional().isInt().withMessage('O ID da categoria deve ser um número inteiro.')
];

module.exports = produtoValidation;