// Imports bibliotecas
import { useEffect } from 'react';
import PropTypes from 'prop-types';

// Import Css
import "../style/adminCategoryModal.css";

// Imports de Icones

const AdminCategoryModal = ({ onClose }) => {


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
                    <div className="form-category">
                        <label htmlFor="name">Nome da categoria</label>
                        <input
                            className="form-control"
                            type="text"
                            id="name"
                            name="name"
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
        </div>
    )
}

AdminCategoryModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};


export default AdminCategoryModal
