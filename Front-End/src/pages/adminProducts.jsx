import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../style/adminProducts.css";
import {
    MdAdd,
    MdFilterAlt,
    MdDelete,
} from "react-icons/md";
import { FaEdit } from "react-icons/fa";

// Importando o componente
import AddProductModal from "../components/addProductModal";
import { fetchProdutos, deleteProduto } from "../services/produtoAPI";
import { fetchCategorias, fetchTiposEDatas } from "../services/filtroAPI";

const AdminProducts = () => {
    const [isModalProductOpen, setIsModalProductOpen] = useState(false);
    const [produtos, setProdutos] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(true);

    // Estados para os filtros
    const [categoria, setCategoria] = useState("");
    const [status, setStatus] = useState("");
    const [date, setDate] = useState("");

    // Estados para armazenar as opções dos filtros
    const [categoriasOptions, setCategoriasOptions] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [datasOptions, setDatasOptions] = useState([]);

    // Função para carregar os filtros (Categorias / Status)
    useEffect(() => {
        const loadFiltros = async () => {
            try {
                const [categoriasData, { tiposMovimentacoes, datasMovimentacoes }] = await Promise.all([
                    fetchCategorias(),
                    fetchTiposEDatas()
                ]);
                setCategoriasOptions(categoriasData);
                setStatusOptions(tiposMovimentacoes);
                setDatasOptions(datasMovimentacoes);
            } catch (error) {
                toast.error('Erro ao carregar filtros.');
            }
        };

        loadFiltros();
    }, []);

    // Função para carregar os produtos com filtros
    useEffect(() => {
        const loadProdutos = async () => {
            try {
                const queryParams = new URLSearchParams();
                if (categoria) queryParams.append('categoria', categoria);
                if (status) queryParams.append('status', status);
                if (date) queryParams.append('date', date);

                const produtosData = await fetchProdutos(queryParams.toString());

                console.log('Dados de produtos após fetch:', produtosData);

                // Verifique se produtosData é um array
                if (Array.isArray(produtosData)) {
                    setProdutos(produtosData);
                } else {
                    throw new Error("Dados de produtos inválidos.");
                }
            } catch (error) {
                toast.error("Erro ao carregar produtos.");
                console.error("Erro ao carregar produtos:", error);
            } finally {
                setLoading(false);
            }
        };

        loadProdutos();
    }, [categoria, status, date]);

    // Função para deletar um produto
    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduto(id);
            setProdutos(produtos.filter(produto => produto.id_produto !== id));
            toast.success("Produto deletado com sucesso.");
        } catch (error) {
            toast.error("Erro ao deletar produto.");
        }
    };

    // Função para adicionar produto à lista
    const handleAddProdutoToList = (newProduto) => {
        setProdutos((prevProdutos) => [...prevProdutos, newProduto]);
    };

    const handleAddProductClick = () => {
        setIsModalProductOpen(true);
    };

    const handleCloseProductModal = () => {
        setIsModalProductOpen(false);
    };

 

    return (
        <main className="Page-Product">
            <div className="Title">
                <h1>
                    Produtos <span>Cadastrados</span>
                </h1>
            </div>

            <header className="admin-product-header-second">
                <nav>
                    <ul>
                        <li>
                            <button
                                onClick={handleAddProductClick}
                                className="btn-produto"
                            >
                                <i><MdAdd /></i> Adicionar Produto
                            </button>
                        </li>
                    </ul>
                </nav>
                <section>
                    <ul className="Filtes-stoks">
                        <span>
                            <i>
                                <MdFilterAlt />
                                ..
                            </i>
                        </span>
                        <li className="category-filter">
                            <label htmlFor="category">Categoria:</label>
                            <select
                                id="category"
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                            >
                                <option value="">Todas</option>
                                {categoriasOptions.map((categoria) => (
                                    <option key={categoria.id_categoria} value={categoria.nome}>
                                        {categoria.nome}
                                    </option>
                                ))}
                            </select>
                        </li>
                        <li className="status-filter">
                            <label htmlFor="status">Status:</label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">Todos</option>
                                {statusOptions.map((tipoMovimentacao) => (
                                    <option key={tipoMovimentacao} value={tipoMovimentacao}>
                                        {tipoMovimentacao}
                                    </option>
                                ))}
                            </select>
                        </li>
                        <li className="date-filter">
                            <label htmlFor="date">Data:</label>
                            <input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </li>
                    </ul>
                </section>
            </header>

            <section className="stock-list">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Descrição</th>
                            <th>Custo</th>
                            <th>Preço</th>
                            <th>QNT_Min</th>
                            <th>QNT_Atual</th>
                            <th>Unidade_Medidas</th>
                            <th>Tipo_Mov</th>
                            <th>Data</th>
                            <th>Atualizado</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.length > 0 && produtos.map(produto => (
                            <tr key={produto.id_produto}>
                                <td>{produto.nome}</td>
                                <td>{produto.categoria?.nome || 'N/A'}</td>
                                <td>{produto.descricao}</td>
                                <td>{produto.preco_compra}</td>
                                <td>{produto.preco_venda}</td>
                                <td>{produto.estoque?.quantidade_minima || 'N/A'}</td>
                                <td>{produto.estoque?.quantidade_atual || 'N/A'}</td>
                                <td>{produto.unidade_de_medida}</td>
                                <td>{produto.movimentacoes?.[0]?.tipo_movimentacao || 'N/A'}</td>
                                <td>{produto.movimentacoes?.[0]?.data_movimentacao || 'N/A'}</td>
                                <td>{produto.updated_at}</td>
                                <td className="td-btn">
                                    <button
                                        className="btn-edit">
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="btn-delete"
                                        onClick={() => handleDeleteProduct(produto.id_produto)}>
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            {isModalProductOpen && <AddProductModal onClose={handleCloseProductModal} onAddProduto={handleAddProdutoToList} />}
        </main>
    );
};

export default AdminProducts;