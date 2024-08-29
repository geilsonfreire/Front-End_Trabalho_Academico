const { Produto, Categoria } = require('../models');
const { validationResult } = require('express-validator');

exports.createProduto = async (req, res) => {
    try {
        // Validação de dados
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Verificar se a categoria existe
        const { id_categoria } = req.body;
        if (id_categoria) {
            const categoria = await Categoria.findByPk(id_categoria);
            if (!categoria) {
                return res.status(400).json({ error: 'Categoria não encontrada.' });
            }
        }

        // Criar produto
        const produto = await Produto.create(req.body);
        res.status(201).json(produto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar produto.', message: error.message });
    }
};

exports.getProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.status(200).json(produtos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar produtos.', message: error.message });
    }
};

exports.getProdutoById = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (produto) {
            res.status(200).json(produto);
        } else {
            res.status(404).json({ error: 'Produto não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar produto.', message: error.message });
    }
};

exports.updateProduto = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (produto) {
            // Verificar se a categoria existe, se fornecida
            const { id_categoria } = req.body;
            if (id_categoria) {
                const categoria = await Categoria.findByPk(id_categoria);
                if (!categoria) {
                    return res.status(400).json({ error: 'Categoria não encontrada.' });
                }
            }

            await produto.update(req.body);
            res.status(200).json(produto);
        } else {
            res.status(404).json({ error: 'Produto não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar produto.', message: error.message });
    }
};

exports.deleteProduto = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (produto) {
            await produto.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Produto não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar produto.', message: error.message });
    }
};