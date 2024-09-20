// Importação de Bibliotecas
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// Importação de Serviços
import { fetchProdutos, createProduto, fetchProdutoById } from '../services/produtoAPI';

// Importação css
import "../style/MovimentacaoEstoque.css";

const MovimentacaoEstoque = () => {
    const [produtos, setProdutos] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState('');
    const [tipoMovimentacao, setTipoMovimentacao] = useState('entrada');
    const [quantidade, setQuantidade] = useState(0);
    const [dataMovimentacao, setDataMovimentacao] = useState('');
    const [produtoDetalhes, setProdutoDetalhes] = useState({
        nome: '',
        descricao: '',
        preco_compra: 0,
        preco_venda: 0,
        unidade_de_medida: '',
        quantidade_minima: 0,
        quantidade_atual: 0,
        categoria: { nome: '' }
    });

    useEffect(() => {
        const carregarProdutos = async () => {
            try {
                const produtos = await fetchProdutos();
                setProdutos(produtos);
               
            } catch (error) {
                console.error('Erro ao carregar produtos:', error);
                toast.error('Erro ao carregar produtos.');
            }
        };

        carregarProdutos();
    }, []);

    const handleProdutoChange = async (produtoId) => {
        try {
            const produto = await fetchProdutoById(produtoId);

            if (produto) {
                setProdutoSelecionado(produtoId);
                setProdutoDetalhes({
                    nome: produto.nome,
                    descricao: produto.descricao,
                    preco_compra: parseFloat(produto.preco_compra),
                    preco_venda: parseFloat(produto.preco_venda),
                    unidade_de_medida: produto.unidade_de_medida,
                    quantidade_minima: produto.estoque.quantidade_minima,
                    quantidade_atual: produto.estoque.quantidade_atual,
                    categoria: {
                        nome: produto.categoria ? produto.categoria.nome : ''
                    }
                });
                
            }
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            // Você pode resetar o estado aqui, se necessário
            setProdutoDetalhes({
                nome: '',
                descricao: '',
                preco_compra: 0,
                preco_venda: 0,
                unidade_de_medida: '',
                quantidade_minima: 0,
                quantidade_atual: 0,
                categoria: { nome: '' }
            });
        }
    };

    // Função para formatar valores como moeda
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };


    // Função para tratar valores de moeda antes de enviar
    const parseCurrency = (value) => {
        // Remove caracteres não numéricos e converte para número
        return parseFloat(value.replace(/\D/g, '')) / 100;
    };

 

    // Função para tratar valores de moeda antes de enviar
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Verifica se o produto foi selecionado
        if (!produtoDetalhes) {
            toast.error("Por favor, selecione um produto.");
            return;
        }

        // Montar os dados conforme o backend espera
        const movimentacaoData = {
            id_produto: parseInt(produtoSelecionado, 10),
            nome: produtoDetalhes.nome,
            descricao: produtoDetalhes.descricao,
            preco_compra: parseFloat(produtoDetalhes.preco_compra),
            preco_venda: parseFloat(produtoDetalhes.preco_venda),
            unidade_de_medida: produtoDetalhes.unidade_de_medida,
            updated_at: new Date().toISOString(),
            categoria: {
                nome: produtoDetalhes.categoria.nome
            },
            estoque: {
                quantidade_minima: produtoDetalhes.estoque?.quantidade_minima || 0,
                quantidade_atual: tipoMovimentacao === 'entrada'
                    ? (produtoDetalhes.estoque?.quantidade_atual || 0) + parseInt(quantidade, 10)
                    : (produtoDetalhes.estoque?.quantidade_atual || 0) - parseInt(quantidade, 10)
            },
            movimentacoes: [
                {
                    tipo_movimentacao: tipoMovimentacao.charAt(0).toUpperCase() + tipoMovimentacao.slice(1),
                    data_movimentacao: dataMovimentacao
                }
            ]
        };

        try {
            await createProduto(movimentacaoData);
            toast.success('Movimentação registrada com sucesso!');
        } catch (error) {
            console.error('Erro ao registrar movimentação:', error);
            toast.error('Erro ao registrar movimentação.');
        }
    };


    return (
        <main className="MovimentacaoContainer">
            <section className="MovimentacaoForm">
                <h2>Movimentação de Estoque</h2>

                <form onSubmit={handleSubmit}>

                    <div className="container-section">
                        <div className="InputGroup">
                            <label htmlFor="produto">Produto</label>
                            <select
                                id="produto"
                                value={produtoSelecionado}
                                onChange={(e) => handleProdutoChange(e.target.value)}
                                required
                            >
                                <option value="">Selecione um produto</option>
                                {produtos.map((produto) => (
                                    <option key={produto.id_produto} value={produto.id_produto}>
                                        {produto.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="InputGroup">
                            <label htmlFor="tipoMovimentacao">Tipo de Movimentação</label>
                            <select
                                id="tipoMovimentacao"
                                value={tipoMovimentacao}
                                onChange={(e) => setTipoMovimentacao(e.target.value)}
                                required
                            >
                                <option value="entrada">Entrada</option>
                                <option value="saida">Saída</option>
                            </select>
                        </div>

                        <div className="InputGroup">
                            <label htmlFor="quantidade">Quantidade</label>
                            <input
                                type="number"
                                id="quantidade"
                                value={quantidade}
                                onChange={(e) => setQuantidade(e.target.value)}
                                required
                                min="1"
                            />
                        </div>

                        <div className="InputGroup">
                            <label htmlFor="dataMovimentacao">Data da Movimentação</label>
                            <input
                                type="date"
                                id="dataMovimentacao"
                                value={dataMovimentacao}
                                onChange={(e) => setDataMovimentacao(e.target.value)}
                                required
                            />
                        </div>

                    </div>

                    <div className="container-section">
                        <div className="InputGroup">
                            <label>Unidade de Medida</label>
                            <input
                                type="text"
                                value={produtoDetalhes.unidade_de_medida}
                                disabled
                            />
                        </div>

                        <div className="InputGroup">
                            <label>Quantidade Mínima</label>
                            <input
                                type="number"
                                value={produtoDetalhes.quantidade_minima}
                                disabled
                            />
                        </div>

                        <div className="InputGroup">
                            <label>Quantidade Atual</label>
                            <input
                                type="number"
                                value={produtoDetalhes.quantidade_atual}
                                disabled
                            />
                        </div>
                    </div>

                    <div className="container-section">

                        <div className="InputGroup">
                            <label>Preço de Compra</label>
                            <input
                                type="text" 
                                value={formatCurrency(produtoDetalhes.preco_compra)}
                                disabled
                            />
                        </div>

                        <div className="InputGroup">
                            <label>Preço de Venda</label>
                            <input
                                type="text"
                                value={formatCurrency(produtoDetalhes.preco_venda)}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setProdutoDetalhes({
                                        ...produtoDetalhes,
                                        preco_venda: parseCurrency(value) || 0
                                    });
                                }}
                            />
                        </div>

                    </div>

                    <div className="InputGroup">
                        <label>Descrição</label>
                        <input
                            type="text"
                            value={produtoDetalhes.descricao}
                            disabled
                        />
                    </div>

                    <button type="submit" className="BtnMovimentacao">
                        Registrar Movimentação
                    </button>
                </form>
            </section>
        </main>
    );
};

export default MovimentacaoEstoque;