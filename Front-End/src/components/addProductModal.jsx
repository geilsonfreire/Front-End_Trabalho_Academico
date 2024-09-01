// Import Bibliotecas
import axios from "axios";
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Import CSS
import "../style/addProductModal.css";

// Imports de Icones
import { BiSolidCategory } from "react-icons/bi";

// Imports de Componentes
import AddCategoryModal from "../components/adminCategoryModal";

const AddProductModal = ({ onClose }) => {
    // Estados para os inputs do formulário
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [precoCompra, setPrecoCompra] = useState("");
    const [precoVenda, setPrecoVenda] = useState("");
    const [unidadeDeMedida, setUnidadeDeMedida] = useState("");
    const [quantidadeMinima, setQuantidadeMinima] = useState("");
    const [quantidadeAtual, setQuantidadeAtual] = useState("");
    const [dataMovimentacao, setDataMovimentacao] = useState("");
    const [tipoMovimentacao, setTipoMovimentacao] = useState(true);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
    const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false);


    // Carregar categorias ao montar o componente
    useEffect(() => {
        const loadCategorias = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/categorias");
                setCategorias(response.data);
            } catch (error) {
                console.error("Erro ao carregar categorias", error);
                toast.error("Erro ao carregar categorias.");
            }
        };
        loadCategorias();
    }, []);


    const handleAddCategoryClick = () => {
        console.log("Abrindo modal");
        setIsModalCategoryOpen(true);
    };

    const handleCloseCategoryModal = () => {
        console.log("Fechando modal");
        setIsModalCategoryOpen(false);
    };
   
    // Função para submissão do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Dados para enviar ao backend
        const produtoData = {
            nome,
            descricao,
            preco_compra: precoCompra,
            preco_venda: precoVenda,
            unidade_de_medida: unidadeDeMedida,
            quantidade_minima: quantidadeMinima,
            quantidade_atual: quantidadeAtual,
            data_movimentacao: dataMovimentacao,
            tipo_movimentacao: tipoMovimentacao ? "Entrada" : "Saida",
            id_categoria: categoriaSelecionada
        };

        try {
            // Fazer requisição ao backend para salvar o produto
            await axios.post("http://localhost:3000/api/produtos", produtoData);
            toast.success("Produto adicionado com sucesso!");
            onClose(); // Fechar modal após salvar
        } catch (error) {
            console.error("Erro ao salvar produto", error);
            toast.error("Erro ao salvar produto.");
        }
    };


    // Implementando efeito de showModal
    useEffect(() => {
        const overlay = document.getElementById("modalOverlay");
        const modal = document.getElementById("modal");

        setTimeout(() => {
            overlay.classList.add("show");
            modal.classList.add("show");

        }, 5);

        return () => {
            overlay.classList.remove("show");
            modal.classList.remove("show");
        };
    }, []);

    return (
        <div className="modal-overlay" id="modalOverlay">
            <div className="modal-content" id="modal">
                <h2>Adicionar Produto</h2>
                <form onSubmit={handleSubmit} className="form-add-product">
                    <div className="form-seçao-1">
                        <div className="form-product">
                            <label htmlFor="name">Nome do produto</label>
                            <input
                                className="form-control"
                                type="text"
                                id="name"
                                name="name"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-seçao-1">
                        <div>
                            <label htmlFor="stock">Quantidade Mínima</label>
                            <input
                                className="form-control"
                                type="number"
                                id="quantidade_minima"
                                name="quantidade_minima"
                                value={quantidadeMinima}
                                onChange={(e) => setQuantidadeMinima(e.target.value)}
                                required
                                step="1"
                            />
                        </div>
                        <div>
                            <label htmlFor="stock">Quantidade Atual</label>
                            <input
                                className="form-control"
                                type="number"
                                id="quantidade_atual"
                                name="quantidade_atual"
                                value={quantidadeAtual}
                                onChange={(e) => setQuantidadeAtual(e.target.value)}
                                required
                                step="1"
                            />
                        </div>
                    </div>

                    <div className="form-seçao-2">
                        <div className="form-custo">
                            <label htmlFor="cost">Preço de Compra</label>
                            <input
                                id="cost"
                                name="cost"
                                className="form-control"
                                value={precoCompra}
                                onChange={(e) => setPrecoCompra(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-price">
                            <label htmlFor="price">Preço de Venda</label>
                            <input
                                className="form-control"
                                id="price"
                                name="price"
                                value={precoVenda}
                                onChange={(e) => setPrecoVenda(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-seçao-2">
                        <div className="form-data">
                            <label htmlFor="data_entrada">Data de Movimentação</label>
                            <input
                                id="data_entrada"
                                name="data_entrada"
                                type="date"
                                className="form-control"
                                value={dataMovimentacao}
                                onChange={(e) => setDataMovimentacao(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-type-entrada">
                            <input
                                type="checkbox"
                                className="form-control"
                                id="tipo_entrada"
                                name="tipo_entrada"
                                checked={tipoMovimentacao}
                                onChange={(e) => setTipoMovimentacao(e.target.checked)}
                            />
                            <label htmlFor="tipo_entrada">Entrada</label>
                        </div>
                    </div>

                    <div className="form-seçao-3">
                        <div className="form-dropdow">
                            <label htmlFor="unidade_de_medida">Unidade de Medida</label>
                            <select
                                id="unidade_de_medida"
                                name="unidade_de_medida"
                                value={unidadeDeMedida}
                                onChange={(e) => setUnidadeDeMedida(e.target.value)}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="P">P</option>
                                <option value="M">M</option>
                                <option value="G">G</option>
                                <option value="GG">GG</option>
                                <option value="350ml">350ml</option>
                                <option value="600ml">600ml</option>
                                <option value="1L">1L</option>
                                <option value="2L">2L</option>
                            </select>
                        </div>

                        <div className="form-dropdow">
                            <label htmlFor="category">Categoria</label>
                            <select
                                id="category"
                                name="category"
                                value={categoriaSelecionada}
                                onChange={(e) => setCategoriaSelecionada(e.target.value)}
                                required
                            >
                                <option value="">Selecione</option>
                                {categorias.map((categoria) => (
                                    <option key={categoria.id_categoria} value={categoria.id_categoria}>
                                        {categoria.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        className="btn-category"
                        type="button"
                        onClick={handleAddCategoryClick}
                    >
                        <i>
                            <BiSolidCategory />
                        </i>{" "}
                        Adicionar Categoria
                    </button>

                    <div className="form-descrition">
                        <label htmlFor="description">Descrição</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                        />
                    </div>

                    <div className="modal-buttons">
                        <button type="submit">Salvar</button>
                        <button type="button" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
            {isModalCategoryOpen && <AddCategoryModal onClose={handleCloseCategoryModal} />}
        </div>
    );
};

AddProductModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default AddProductModal;
