const { Estoque } = require('../database/models');

exports.createEstoque = async (req, res) => {
    try {
        const estoque = await Estoque.create(req.body);
        res.status(201).json(estoque);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

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

exports.updateEstoque = async (req, res) => {
    try {
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
};

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