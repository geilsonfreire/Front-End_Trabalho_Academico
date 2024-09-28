// Imports bibliotecas
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

// Import Css
import "../style/adminCategoryModal.css";

// Imports componentes
import { addCategoria } from '../services/categoriasAPI';

const AdminCategoryModal = ({ onClose }) => {
    const [name, setName] = useState(""); // Estado para o nome da categoria
    const [loading, setLoading] = useState(false);

    // Função para lidar com o envio do formulário
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await addCategoria({ nome: name });
            toast.success("Categoria adicionada com sucesso.");
            onClose(); // Fecha o modal após o sucesso
        } catch (error) {
            toast.error("Erro ao adicionar categoria.");
        } finally {
            setLoading(false);
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
                <form onSubmit={handleSubmit} className="form-add-category">
                    <div className="form-category">
                        <label htmlFor="name">Nome da categoria</label>
                        <input
                            className="form-control"
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="modal-buttons">
                        <button type="submit" disabled={loading}>
                            {loading ? "Salvando..." : "Salvar"}
                        </button>
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
