// Import Bibliotecas
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";

// Import CSS
import "../style/addProductModal.css"

// Imports de Icones
import { BiSolidCategory } from "react-icons/bi";
import { IoMdImages } from "react-icons/io";

// Imports de Componentes
import AddCategoryModal from "../adminCategoryModal/adminCategoryModal";

const AddProductModal = ({ onClose }) => {
    const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false);

    const handleAddCategoryClick = () => {
        console.log("Abrindo modal");
        setIsModalCategoryOpen(true);
    };

    const handleCloseCategoryModal = () => {
        console.log("Fechando modal");
        setIsModalCategoryOpen(false);
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
                <form onSubmit={""} className="form-add-product">
                    <div className="form-seçao-1">
                        <div className="form-img">
                        
                                <div className="image-preview">
                                    <img
                                        className="modal-image "
                                        src={""}
                                        alt="Preview"
                                    />
                                </div>
                           
                        </div>
                        <div className="form-product">
                            <label htmlFor="name">Nome do produto</label>
                            <input
                                className="form-control"
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Nome do produto"
                                value={""}
                                onChange={""}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="stock">Quantidade</label>
                            <input
                                className="form-control"
                                type="number"
                                id="stock"
                                name="stock"
                                value={""}
                                onChange={""}
                                required
                                step="1"
                            />
                        </div>
                    </div>
                    <div className="form-seçao-2">
                        <div className="form-custo">
                            <label htmlFor="cost">Valor de Custo</label>
                            <input
                                id="cost"
                                name="cost"
                                className="form-control"
                                value={""}
                                onChange={""}
                                required
                            />
                        </div>
                        <div className="form-price">
                            <label htmlFor="price">Preço Unit</label>
                            <input
                                className="form-control"
                                id="price"
                                name="price"
                                value={""}
                                onChange={""}
                                required
                            />
                        </div>
                        <div className="form-checkbox">
                            <input
                                className="Form-control"
                                type="checkbox"
                                value="Atacado"
                                id="flexCheckDefault"
                            ></input>
                            <label htmlFor="flexCheckDefault">Atacado</label>
                        </div>
                    </div>
                    <div className="form-seçao-2">
                        <div className="form-dropdow">
                            <label htmlFor="subcategory">Tamanho</label>
                            <select
                                id="subcategory"
                                name="subcategory"
                                value={""}
                                onChange={""}
                                required
                            >
                                <option value="">Tamanho</option>
                                <option value="p">P</option>
                                <option value="m">M</option>
                                <option value="g">G</option>
                                <option value="gg">GG</option>
                            </select>
                        </div>
                        <div className="form-dropdow">
                            <label htmlFor="category">Categoria</label>
                            <select
                                id="category"
                                name="category"
                                value={""}
                                onChange={""}
                                required
                            >
                                <option value="">Selecione uma categoria</option>
                               
                                    <option key={""} value={""}>
                                        {""}
                                    </option>
                               
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
                            value={""}
                            onChange={""}
                            required
                        />
                    </div>
                    <div className="form-add-img">
                        <i><IoMdImages /></i>
                        <input
                            className="form-control"
                            type="file"
                            id="image"
                            name="image"
                            onChange={""}
                            required
                            accept="image/*"
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
