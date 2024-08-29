const { MovimentacaoEstoque, Produto, Estoque } = require('../models');
const { validationResult } = require('express-validator');
const movimentacaoEstoqueValidation = require('../validations/movimentacaoEstoqueValidation');

exports.createMovimentacaoEstoque = [
    movimentacaoEstoqueValidation,
    async (req, res) => {
        try {
            // Verificar se há erros de validação
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Verificar se o produto existe
            const { id_produto } = req.body;
            if (id_produto) {
                const produto = await Produto.findByPk(id_produto);
                if (!produto) {
                    return res.status(400).json({ error: 'Produto não encontrado.' });
                }
            }

            // Verificar se o estoque existe
            const { id_estoque } = req.body;
            if (id_estoque) {
                const estoque = await Estoque.findByPk(id_estoque);
                if (!estoque) {
                    return res.status(400).json({ error: 'Estoque não encontrado.' });
                }
            }

            // Criar a movimentação de estoque
            const movimentacao = await MovimentacaoEstoque.create(req.body);
            res.status(201).json(movimentacao);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

exports.getMovimentacoesEstoque = async (req, res) => {
    try {
        const movimentacoes = await MovimentacaoEstoque.findAll();
        res.status(200).json(movimentacoes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getMovimentacaoEstoqueById = async (req, res) => {
    try {
        const movimentacao = await MovimentacaoEstoque.findByPk(req.params.id);
        if (movimentacao) {
            res.status(200).json(movimentacao);
        } else {
            res.status(404).json({ error: 'Movimentação não encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateMovimentacaoEstoque = [
    movimentacaoEstoqueValidation,
    async (req, res) => {
        try {
            // Verificar se há erros de validação
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const movimentacao = await MovimentacaoEstoque.findByPk(req.params.id);
            if (movimentacao) {
                await movimentacao.update(req.body);
                res.status(200).json(movimentacao);
            } else {
                res.status(404).json({ error: 'Movimentação não encontrada' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

exports.deleteMovimentacaoEstoque = async (req, res) => {
    try {
        const movimentacao = await MovimentacaoEstoque.findByPk(req.params.id);
        if (movimentacao) {
            await movimentacao.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Movimentação não encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};