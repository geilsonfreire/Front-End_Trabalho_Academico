const { Estoque } = require('../models');
const { validationResult } = require('express-validator');
const estoqueValidation = require('../validations/estoqueValidation');

exports.createEstoque = [
    estoqueValidation,
    async (req, res) => {
        try {
            // Verificar se há erros de validação
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Criar o estoque
            const estoque = await Estoque.create(req.body);
            res.status(201).json(estoque);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

exports.getEstoques = async (req, res) => {
    try {
        const estoques = await Estoque.findAll();
        res.status(200).json(estoques);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getEstoqueById = async (req, res) => {
    try {
        const estoque = await Estoque.findByPk(req.params.id);
        if (estoque) {
            res.status(200).json(estoque);
        } else {
            res.status(404).json({ error: 'Estoque não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateEstoque = [
    estoqueValidation,
    async (req, res) => {
        try {
            // Verificar se há erros de validação
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const estoque = await Estoque.findByPk(req.params.id);
            if (estoque) {
                await estoque.update(req.body);
                res.status(200).json(estoque);
            } else {
                res.status(404).json({ error: 'Estoque não encontrado' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

exports.deleteEstoque = async (req, res) => {
    try {
        const estoque = await Estoque.findByPk(req.params.id);
        if (estoque) {
            await estoque.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Estoque não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};