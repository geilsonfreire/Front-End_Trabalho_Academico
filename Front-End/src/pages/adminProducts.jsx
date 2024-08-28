// Import Bibliotecas
import { useState } from "react";
// import { toast } from "react-hot-toast";

// Import Icons
import {
    MdOutlineSearch,
    MdAdd,
    MdFilterAlt,
    MdDelete
} from "react-icons/md";
import { FaEdit } from "react-icons/fa";


// Import Components
import AddProductModal from "../components/addProductModal";


// Import CSS
import "../style/adminProducts.css";
 

const AdminProducts = () => {
    const [isModalProductOpen, setIsModalProductOpen] = useState(false);
    
    

    const handleAddProductClick = () => {
        console.log("Abrindo modal");
        setIsModalProductOpen(true);
    };  // Função para abrir o modal de adicionar produto

    const handleCloseProductModal = () => {
        console.log("Fechando modal");
        setIsModalProductOpen(false);
    }; // Função para fechar o modal de adicionar produto

    return (
        <main className="Page-Product">
            <toast />
            <div className="Title">
                <h1>
                    Produtos <span>Cadastrados</span>
                </h1>
                <div className="search-bar">
                    <i>
                        <MdOutlineSearch />
                    </i>
                    <input type="text" placeholder="Pesquisa" />
                </div>
            </div>

            <header className="admin-product-header-second">
                <nav>
                    <ul>
                        <li>
                            <button
                                onClick={handleAddProductClick}
                                className="btn-produto"
                            >
                                <i>
                                    <MdAdd />
                                </i>{" "}
                                Adicionar Produto
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>

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
                        <select id="category">
                            <option value="">Todas</option>
                            <option value="Categoria 1">Categoria 1</option>
                            <option value="Categoria 2">Categoria 2</option>
                        </select>
                    </li>
                    <li className="status-filter">
                        <label htmlFor="status">Status:</label>
                        <select id="status">
                            <option value="">Todas</option>
                            <option value="Pendente">Pendente</option>
                            <option value="Em estoque">Em estoque</option>
                            <option value="Concluido">Concluido</option>
                        </select>
                    </li>
                    <li className="venda-tipo-filter">
                        <label htmlFor="venda">Vendas:</label>
                        <select id="venda">
                            <option value="">Todas</option>
                            <option value="Atacado">Atacado</option>
                            <option value="Varejo">Varejo</option>
                        </select>
                    </li>
                    <li className="date-filter">
                        <label htmlFor="date">Data:</label>
                        <input id="date" type="date" />
                    </li>
                </ul>
            </section>
            <section className="stock-list">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Custo</th>
                            <th>Preço</th>
                            <th>QNT_Min</th>
                            <th>QNT_Atual</th>
                            <th>Unidade_Medidas</th>
                            <th>Status</th>
                            <th>Açoes</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            <tr key={""}>
                                <td>{"product.name"}</td>
                                <td>{"product.category"}</td>
                                <td>{"product.cost"}</td>
                                <td>{"product.price"}</td>
                                <td>{"product.stockmin"}</td>
                                <td>{"product.stockAtual"}</td>
                                <td>{"product.UnitMedidas"}</td>
                                <td>{"product.Status"}</td>
                                <td>{"product.createdAt"}</td>
                                <td>
                                    <button className="btn-edit"><FaEdit /></button>
                                    <button className="btn-delete"><MdDelete /></button>
                                </td>
                            </tr>
                     
                    </tbody>
                </table>
            </section>
            {isModalProductOpen && <AddProductModal onClose={handleCloseProductModal} />}
        </main>
    );
};

export default AdminProducts;
