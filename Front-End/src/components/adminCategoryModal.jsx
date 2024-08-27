// Imports bibliotecas
import { useState, useEffect } from 'react';
import Cleave from 'cleave.js/react';
import PropTypes from 'prop-types';

// Import Css
import "../styles/adminCategoryModal.css";

// Imports de Icones
import { IoMdImages } from 'react-icons/io';
import { MdArrowDropDown } from "react-icons/md";

const AdminCategoryModal = ({ onClose }) => {
    
    // Função para mostrar e esconder o dropdown prefixação de preço
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownVisible(prevState => !prevState);
    };
    // Implementando efeito de mostrar o dropdown de prefixação de preço
    useEffect(() => {
        const dropdown = document.getElementById("dropdown");

        if (dropdown) {
            if (isDropdownVisible) {
                setTimeout(() => {
                    dropdown.classList.add("dropdown-show");
                }, 10);
            } else {
                dropdown.classList.remove("dropdown-show");
            }
            }
    }, [isDropdownVisible]);

    // Função para adicionar estado do checkbox definindo se está marcado ou não
    const [checkboxStates, setCheckboxStates] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
        checkbox5: false,
        checkbox6: false,
        checkbox7: false,
        checkbox8: false
    });
    // Função para adicionar estado do checkbox
    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;
        setCheckboxStates(prevStates => ({
            ...prevStates,
            [id]: checked
        })); // Adiciona o estado do checkbox
    };


    // Atualiza o estado não formatado e o estado formatado ao digitar
    const handlePriceChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        subcategory: '',
        image: null
    });
    
    // Função para adicionar imagem
    const [previewImage, setPreviewImage] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    // Implementando efeito de showModal
    useEffect(() => {
        const overlay = document.getElementById("modalOverlayTow");
        const modal = document.getElementById("modalTow");

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
        <div className="modal-overlay" id="modalOverlayTow">
            <div className="modal-content modal-category" id="modalTow">
                <h2>Adicionar Categoria</h2>
                <form onSubmit={""} className="form-add-category">
                    <div className="form-seçao-1">
                        <div className="form-img">
                            {previewImage && (
                                <div className="image-preview">
                                    <img
                                        className="modal-image "
                                        src={previewImage}
                                        alt="Preview"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="form-add-img">
                            <i><IoMdImages /></i>
                            <input
                                className="form-control"
                                type="file"
                                id="image"
                                alt='Imagem do produto'
                                name="image"
                                onChange={handleImageChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-category">
                        <label htmlFor="name">Nome da categoria</label>
                        <input
                            className="form-control"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Adicione o nome da categoria"
                            required
                        />
                    </div>

                    <div className="form-seçao-2">

                        <div className="form-dropdow-category">
                            <button type='button' onClick={toggleDropdown}>
                                Prefixação de preço por Atacado
                                <i><MdArrowDropDown /></i>
                            </button>
                            <div id='dropdown' className={`form-dropdow-prefix ${isDropdownVisible ? 'dropdown-show' : ''}`}>
                                {[1, 5, 8, 12, 25, 40, 70, 100].map((quantity, index) => (
                                    <div className="form-inputs" key={index}>
                                        <input
                                            className='Form-check-input'
                                            type="checkbox"
                                            id={`checkbox${index + 1}`}
                                            name={`checkbox${index + 1}`}
                                            checked={checkboxStates[`checkbox${index + 1}`]}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label htmlFor={`checkbox${index + 1}`}>{quantity} UND</label>
                                        <Cleave
                                            className='form-price'
                                            id={`price${quantity}`}
                                            name={`price${quantity}`}
                                            placeholder="Adicione o preço do produto"
                                            options={{ numeral: true, numeralThousandsGroupStyle: 'thousand', prefix: 'R$ ' }}
                                            onChange={handlePriceChange}
                                            disabled={!checkboxStates[`checkbox${index + 1}`]}
                                            value={formData[`price${quantity}`] || ''}
                                        />
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                    <div className="form-descrition">
                        <label htmlFor="description">Descrição</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            placeholder="Adicione a descrição do produto"
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
        </div>
    )
}

AdminCategoryModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};


export default AdminCategoryModal
