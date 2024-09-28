const { Produto, Categoria, Estoque, MovimentacaoEstoque } = require('../models');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

// Função auxiliar para validar associações
const validateAssociations = async (id_categoria, id_estoque, id_movimentacao) => {
    if (id_categoria) {
        const categoria = await Categoria.findByPk(id_categoria);
        if (!categoria) {
            throw new Error('Categoria não encontrada.');
        }
    }
    if (id_estoque) {
        const estoque = await Estoque.findByPk(id_estoque);
        if (!estoque) {
            throw new Error('Estoque não encontrado.');
        }
    }
    if (id_movimentacao) {
        const movimentacao = await MovimentacaoEstoque.findByPk(id_movimentacao);
        if (!movimentacao) {
            throw new Error('Movimentação de estoque não encontrada.');
        }
    }
};

// Criar um novo produto com dados relacionados
exports.createProduto = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        nome, descricao, preco_compra, preco_venda,
        unidade_de_medida, quantidade_minima,
        quantidade_atual, data_movimentacao, tipo_movimentacao,
        id_categoria
    } = req.body;

    try {
        // Validar categoria
        if (id_categoria) {
            const categoria = await Categoria.findByPk(id_categoria);
            if (!categoria) {
                return res.status(400).json({ error: 'Categoria não encontrada.' });
            }
        }

        // Criar o produto
        const novoProduto = await Produto.create({
            nome,
            descricao,
            preco_compra,
            preco_venda,
            unidade_de_medida,
            id_categoria
        });

        // Obter o produto com o ID após a criação
        const produtoCriado = await Produto.findByPk(novoProduto.id_produto, {
            include: [
                { model: Categoria, as: 'categoria', attributes: ['nome'] },
                { model: Estoque, as: 'estoque', attributes: ['quantidade_minima', 'quantidade_atual'] },
                { model: MovimentacaoEstoque, as: 'movimentacoes', attributes: ['tipo_movimentacao', 'quantidade',  'data_movimentacao'] }
            ]
        });

        // Criar o registro no estoque
        await Estoque.create({
            id_produto: novoProduto.id_produto,
            quantidade_minima,
            quantidade_atual,
        });

        // Criar a movimentação de estoque
        await MovimentacaoEstoque.create({
            id_produto: novoProduto.id_produto,
            tipo_movimentacao,
            data_movimentacao,
            quantidade: quantidade_atual
        });

        return res.status(201).json(produtoCriado);
    } catch (error) {
        console.error("Erro ao criar produto e dados relacionados", error);
        return res.status(500).json({ message: "Erro ao criar produto e dados relacionados", error: error.message });
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
                'id_produto',
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
                    attributes: ['tipo_movimentacao', 'quantidade', 'data_movimentacao']
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
                'id_produto',
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
                    attributes: ['tipo_movimentacao', 'quantidade', 'data_movimentacao']
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
    const { id } = req.params;
    const {
        nome, descricao, preco_compra, preco_venda,
        unidade_de_medida, quantidade_minima,
        quantidade_atual, data_movimentacao, tipo_movimentacao,
        id_categoria
    } = req.body;

    try {
        const produto = await Produto.findByPk(id);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        // Validar categoria
        if (id_categoria) {
            const categoria = await Categoria.findByPk(id_categoria);
            if (!categoria) {
                return res.status(400).json({ error: 'Categoria não encontrada.' });
            }
        }

        await produto.update({
            nome,
            descricao,
            preco_compra,
            preco_venda,
            unidade_de_medida,
            id_categoria
        });

        // Buscar o produto atualizado com as associações
        const produtoAtualizado = await Produto.findByPk(id, {
            include: [
                { model: Categoria, as: 'categoria', attributes: ['nome'] },
                { model: Estoque, as: 'estoque', attributes: ['quantidade_minima', 'quantidade_atual'] },
                { model: MovimentacaoEstoque, as: 'movimentacoes', attributes: ['tipo_movimentacao', 'quantidade', 'data_movimentacao'] }
            ]
        });

        // Atualizar o registro no estoque
        const estoque = await Estoque.findOne({ where: { id_produto: id } });
        if (estoque) {
            await estoque.update({
                quantidade_minima,
                quantidade_atual
            });
        } else {
            await Estoque.create({
                id_produto: id,
                quantidade_minima,
                quantidade_atual
            });
        }

        // Atualizar a movimentação de estoque
        const movimentacao = await MovimentacaoEstoque.findOne({ where: { id_produto: id } });
        if (movimentacao) {
            await movimentacao.update({
                tipo_movimentacao,
                data_movimentacao,
                quantidade: quantidade_atual  // Adicionando o campo quantidade
            });
        } else {
            await MovimentacaoEstoque.create({
                id_produto: id,
                tipo_movimentacao,
                data_movimentacao: data_movimentacao || new Date(),
                quantidade: quantidade_atual  // Adicionando o campo quantidade
            });
        }

        return res.status(200).json(produtoAtualizado);
    } catch (error) {
        console.error("Erro ao atualizar produto e dados relacionados", error);
        return res.status(500).json({ message: "Erro ao atualizar produto e dados relacionados", error: error.message });
    }
};


// Deletar um produto existente
exports.deleteProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produto = await Produto.findByPk(id);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        // Deletar o registro no estoque
        await Estoque.destroy({ where: { id_produto: id } });

        // Deletar a movimentação de estoque
        await MovimentacaoEstoque.destroy({ where: { id_produto: id } });

        // Deletar o produto
        await produto.destroy();
        return res.status(200).json({ message: 'Produto deletado com sucesso.', id_produto: id });

        return res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar produto e dados relacionados", error);
        return res.status(500).json({ message: "Erro ao deletar produto e dados relacionados", error: error.message });
    }
};