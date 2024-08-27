// Imports Bibiotecas
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';

//Import CSS
import '../style/MenuDropDownPerfil.css'

//Import icon, image
import { MdSettings, MdLogout, MdPersonAddAlt1 } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";


const MenuDropDownPerfil = ({ isDropdownOpen, setIsDropdownOpen }) => {

    const navigate = useNavigate();
    const handleNavigate = () => { // Adicionar path se for nescessario
        setIsDropdownOpen(false);
        navigate("/admin/adminPix");
    };

    return (
        <div className={`container-menu-dropdown ${isDropdownOpen ? 'Dropshow' : ''}`}>
            <nav className='menu-dropdown-nav'>
                <ul>
                    <li onClick={() => handleNavigate('#')}>
                        <FaUserEdit />
                        <span>Perfil</span>
                    </li>
                    <li onClick={() => handleNavigate('/admin/adminPix')}>
                        <MdPersonAddAlt1 />
                        <span>Adicionar usuario</span>
                    </li>
                    <li onClick={() => handleNavigate('#')}>
                        <MdSettings />
                        <span>Configurações</span>
                    </li>
                    <hr />
                    <li onClick={() => handleNavigate('/')}>
                        <MdLogout />
                        <span>Sair</span>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

MenuDropDownPerfil.propTypes = {
    isDropdownOpen: PropTypes.bool.isRequired,
    setIsDropdownOpen: PropTypes.func.isRequired,
};

export default MenuDropDownPerfil
