// Imports Bibliotecas
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Imports Css
import "../style/adminProducts.css";

// Imports de Icones
import {
    MdAdd,
    MdFilterAlt,
    MdDelete,
} from "react-icons/md";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

// Importando o componente
import AddProductModal from "../components/addProductModal";
import { fetchProdutos, deleteProduto, updateProduto } from "../services/produtoAPI";
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

    // Estados de controle de edições
    const [editingProductId, setEditingProductId] = useState(null);
    const [editedProductData, setEditedProductData] = useState({});

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

    // Função para abrir o modal de produto
    const handleAddProductClick = () => {
        setIsModalProductOpen(true);
    };

    // Função para fechar o modal de produto
    const handleCloseProductModal = () => {
        setIsModalProductOpen(false);
    };

    // Função para editar um produto
    const handleEditProduct = (produto) => {
        setEditingProductId(produto.id_produto);
        setEditedProductData({ ...produto });
    };

    // Função para salvar inputs edição de um produto
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProductData(prev => ({ ...prev, [name]: value }));
    };

    // Função para cancelar a edição
    const handleCancelEdit = () => {
        setEditingProductId(null);
        setEditedProductData({});
    };

    // Função para salvar a edição de um produto
    const handleSaveEdit = async (id) => {
        try {
            await updateProduto(editedProductData);
            setProdutos(produtos.map(produto =>
                produto.id_produto === id ? editedProductData : produto
            ));
            setEditingProductId(null);
            toast.success("Produto atualizado com sucesso.");
        } catch (error) {
            toast.error('Erro ao atualizar produto.');
        }
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
                                <td>
                                    {editingProductId === produto.id_produto ? (
                                        <input
                                            type="text"
                                            name="nome"
                                            value={editedProductData.nome}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        produto.nome
                                    )}
                                </td>
                                <td>
                                    {editingProductId === produto.id_produto ? (
                                        <select
                                            name="id_categoria"
                                            value={editedProductData.id_categoria}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Selecione</option>
                                            {categoriasOptions.map(categoria => (
                                                <option key={categoria.id_categoria} value={categoria.id_categoria}>
                                                    {categoria.nome}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        produto.categoria?.nome || 'N/A'
                                    )}
                                </td>
                                <td>
                                    {editingProductId === produto.id_produto ? (
                                        <input
                                            type="text"
                                            name="descricao"
                                            value={editedProductData.descricao}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        produto.descricao
                                    )}
                                </td>
                                <td>
                                    {editingProductId === produto.id_produto ? (
                                        <input
                                            type="number"
                                            name="preco_compra"
                                            value={editedProductData.preco_compra}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        produto.preco_compra
                                    )}
                                </td>
                                <td>
                                    {editingProductId === produto.id_produto ? (
                                        <input
                                            type="number"
                                            name="preco_venda"
                                            value={editedProductData.preco_venda}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        produto.preco_venda
                                    )}
                                </td>
                                <td>
                                    {editingProductId === produto.id_produto ? (
                                        <input
                                            type="number"
                                            name="quantidade_minima"
                                            value={editedProductData.quantidade_minima}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        produto.estoque?.quantidade_minima || 'N/A'
                                    )}
                                </td>
                                <td>
                                    {editingProductId === produto.id_produto ? (
                                        <input
                                            type="number"
                                            name="quantidade_atual"
                                            value={editedProductData.quantidade_atual}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        produto.estoque?.quantidade_atual || 'N/A'
                                    )}
                                </td>
                                <td>
                                    {editingProductId === produto.id_produto ? (
                                        <input
                                            type="text"
                                            name="unidade_de_medida"
                                            value={editedProductData.unidade_de_medida}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        produto.unidade_de_medida
                                    )}
                                </td>
                                <td>
                                    {editingProductId === produto.id_produto ? (
                                        <select
                                            name="tipo_movimentacao"
                                            value={editedProductData.tipo_movimentacao}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Selecione</option>
                                            {statusOptions.map(status => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        produto.movimentacoes?.[0]?.tipo_movimentacao || 'N/A'
                                    )}
                                </td>
                                <td>
                                    {editingProductId === produto.id_produto ? (
                                        <input
                                            type="date"
                                            name="data_movimentacao"
                                            value={editedProductData.data_movimentacao}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        produto.movimentacoes?.[0]?.data_movimentacao || 'N/A'
                                    )}
                                </td>
                                <td>{produto.updated_at}</td>
                                <td className="td-btn">
                                    {editingProductId === produto.id_produto ? (
                                        <>
                                            <button
                                                className="btn-save"
                                                onClick={() => handleSaveEdit(produto.id_produto)}
                                            >
                                                <FaSave />
                                            </button>
                                            <button
                                                className="btn-cancel"
                                                onClick={handleCancelEdit}
                                            >
                                                <FaTimes />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="btn-edit"
                                                onClick={() => handleEditProduct(produto)}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => handleDeleteProduct(produto.id_produto)}
                                            >
                                                <MdDelete />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            {
                isModalProductOpen && <AddProductModal
                    onClose={handleCloseProductModal}
                    onAddProduto={handleAddProdutoToList}
                />
            }
        </main>
    );
};

export default AdminProducts;