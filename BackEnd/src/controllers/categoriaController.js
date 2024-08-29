const { Categoria } = require('../models');
const { validationResult } = require('express-validator');

// Criação de uma nova categoria
exports.createCategoria = async (req, res) => {
    try {
        // Validação dos dados recebidos
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Criação da categoria
        const categoria = await Categoria.create(req.body);
        res.status(201).json(categoria);
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
        res.status(500).json({ error: 'Erro ao criar categoria.', message: error.message });
    }
};

// Recupera todas as categorias
exports.getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar categorias.', message: error.message });
    }
};

// Recupera uma categoria pelo ID
exports.getCategoriaById = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if (categoria) {
            res.status(200).json(categoria);
        } else {
            res.status(404).json({ error: 'Categoria não encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar categoria.', message: error.message });
    }
};

// Atualiza uma categoria existente
exports.updateCategoria = async (req, res) => {
    try {
        // Validação dos dados recebidos
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const categoria = await Categoria.findByPk(req.params.id);
        if (categoria) {
            await categoria.update(req.body);
            res.status(200).json(categoria);
        } else {
            res.status(404).json({ error: 'Categoria não encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar categoria.', message: error.message });
    }
};

// Deleta uma categoria pelo ID
exports.deleteCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if (categoria) {
            await categoria.destroy();
            res.status(204).send(); // Enviar uma resposta sem conteúdo
        } else {
            res.status(404).json({ error: 'Categoria não encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar categoria.', message: error.message });
    }
};