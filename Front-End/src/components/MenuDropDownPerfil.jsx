// Imports Bibiotecas
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import { useContext } from 'react';

//Import CSS
import '../style/MenuDropDownPerfil.css'

//Import icon, image
import { MdSettings, MdLogout, MdPersonAddAlt1 } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";

// Import de Componentes
import AuthContext from '../context/AuthContext';


const MenuDropDownPerfil = ({ isDropdownOpen, setIsDropdownOpen }) => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleNavigate = (path) => { 
        console.log('Navegando para:', path);
        setIsDropdownOpen(false);
        navigate(path);
    };

    const handleLogout = () => {
        console.log('Deslogado!');
        logout(); // Chama a função logout do contexto
        navigate('/'); // Redireciona para a página inicial após logout
    };

    return (
        <div className={`container-menu-dropdown ${isDropdownOpen ? 'Dropshow' : ''}`}>
            <nav className='menu-dropdown-nav'>
                <ul>
                    <li onClick={() => handleNavigate('/admin/perfil')}>
                        <FaUserEdit />
                        <span>Perfil</span>
                    </li>
                    <li onClick={() => handleNavigate('/admin/adminCadastroUsuarios')}>
                        <MdPersonAddAlt1 />
                        <span>Adicionar usuario</span>
                    </li>
                    <li onClick={() => handleNavigate('/admin/adminConfig')}>
                        <MdSettings />
                        <span>Configurações</span>
                    </li>
                    <hr />
                    <li onClick={handleLogout}>
                        <MdLogout />
                        <span>Sair</span>
                    </li>
            </ul>
        </nav>
        </div >
    )
}

MenuDropDownPerfil.propTypes = {
    isDropdownOpen: PropTypes.bool.isRequired,
    setIsDropdownOpen: PropTypes.func.isRequired,
};

export default MenuDropDownPerfil
