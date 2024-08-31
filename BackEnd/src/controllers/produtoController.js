const { Produto, Categoria, Estoque, MovimentacaoEstoque } = require('../models');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

// Criar um novo produto
exports.createProduto = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id_categoria, id_estoque, id_movimentacao } = req.body;

        if (id_categoria) {
            const categoria = await Categoria.findByPk(id_categoria);
            if (!categoria) {
                return res.status(400).json({ error: 'Categoria não encontrada.' });
            }
        }
        if (id_estoque) {
            const estoque = await Estoque.findByPk(id_estoque);
            if (!estoque) {
                return res.status(400).json({ error: 'Estoque não encontrado.' });
            }
        }
        if (id_movimentacao) {
            const movimentacao = await MovimentacaoEstoque.findByPk(id_movimentacao);
            if (!movimentacao) {
                return res.status(400).json({ error: 'Movimentação de estoque não encontrada.' });
            }
        }

        const produto = await Produto.create(req.body);
        res.status(201).json(produto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar produto.', message: error.message });
    }
};

// Obter todos os produtos com filtros e dados relacionados
exports.getProdutos = async (req, res) => {
    try {
        const { categoria, status, data } = req.query;
        const filters = {};

        // Filtro por categoria
        if (categoria) {
            filters['$categoria.nome$'] = categoria;
        }

        // Filtro por status (movimentação)
        if (status) {
            filters['$movimentacoes.tipo_movimentacao$'] = status;
        }

        // Filtro por data
        if (data) {
            filters['$movimentacoes.data_movimentacao$'] = data;
        }

        const produtos = await Produto.findAll({
            attributes: [
                'nome',
                'descricao',
                'preco_compra',
                'preco_venda',
                'unidade_de_medida',
                'updated_at'
            ],
            include: [
                {
                    model: Categoria,
                    as: 'categoria', // Use o alias definido na associação
                    attributes: ['nome']
                },
                {
                    model: Estoque,
                    as: 'estoque', // Use o alias definido na associação
                    attributes: ['quantidade_minima', 'quantidade_atual']
                },
                {
                    model: MovimentacaoEstoque,
                    as: 'movimentacoes', // Use o alias definido na associação
                    attributes: ['tipo_movimentacao', 'data_movimentacao']
                }
            ],
            where: filters
        });

        res.status(200).json(produtos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar produtos.', message: error.message });
    }
};

// Obter um produto por ID com dados relacionados
exports.getProdutoById = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id, {
            attributes: [
                'nome',
                'descricao',
                'preco_compra',
                'preco_venda',
                'unidade_de_medida',
                'updated_at'
            ],
            include: [
                {
                    model: Categoria,
                    as: 'categoria',
                    attributes: ['nome']
                },
                {
                    model: Estoque,
                    as: 'estoque',
                    attributes: ['quantidade_minima', 'quantidade_atual']
                },
                {
                    model: MovimentacaoEstoque,
                    as: 'movimentacoes',
                    attributes: ['tipo_movimentacao', 'data_movimentacao']
                }
            ]
        });

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

// Atualizar um produto existente
exports.updateProduto = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (produto) {
            const { id_categoria, id_estoque, id_movimentacao } = req.body;

            if (id_categoria) {
                const categoria = await Categoria.findByPk(id_categoria);
                if (!categoria) {
                    return res.status(400).json({ error: 'Categoria não encontrada.' });
                }
            }
            if (id_estoque) {
                const estoque = await Estoque.findByPk(id_estoque);
                if (!estoque) {
                    return res.status(400).json({ error: 'Estoque não encontrado.' });
                }
            }
            if (id_movimentacao) {
                const movimentacao = await MovimentacaoEstoque.findByPk(id_movimentacao);
                if (!movimentacao) {
                    return res.status(400).json({ error: 'Movimentação de estoque não encontrada.' });
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

// Deletar um produto
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