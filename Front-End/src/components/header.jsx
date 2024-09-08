// Import Bibliotecas
import { useState, useEffect} from "react";

// Import CSS
import "../style/header.css";

// Import components
import MenuDropDownPerfil from "../components/MenuDropDownPerfil";

// Imports icons e imagens
import LogoPerfil from "../assets/img/Ge.jpg";
import {
    MdOutlineSearch,
    MdNotifications,
    MdArrowCircleDown,
    MdArrowCircleUp
} from "react-icons/md";

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const toggleDropdown = () => {
        setIsDropdownOpen(PrevState => !PrevState);
    }; // Alterna o estado de aberto/fechado do dropdown   

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Verifica se o clique está fora do dropdown e do botão de abrir/fechar
            if (
                !event.target.closest('.menu-dropdow') &&
                !event.target.closest('.container-menu-dropdown')
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <header className="Header-painel">
            {/* <!-- Header Left --> */}
            <div className="search-bar">
                <i>
                    <MdOutlineSearch />
                </i>
                <input type="text" placeholder="Pesquisa" />
            </div>

            {/* <!-- Header Right --> */}
            <div className="header-right">
                <div className="notifications">
                    <i>
                        <MdNotifications />
                    </i>
                    <span className="notification-count">6</span>
                </div>

                <div className="profile">
                    <div className="perfill-name-img">
                        <img src={LogoPerfil} alt="User Profile" />
                        <span className="user-name">Geilson Freire</span>
                    </div>
                    <div className="pefill-adim-tipo">
                        <span className="user-type">Admin</span>
                    </div>
                </div>

                <div className="menu-dropdow"
                    onClick={toggleDropdown} // Alterna o estado de aberto/fechado do dropdown
                    
                >
                    <i>
                        {isDropdownOpen ? <MdArrowCircleUp /> : <MdArrowCircleDown />}
                    </i>
                </div>
                {isDropdownOpen && (
                    <MenuDropDownPerfil
                        isDropdownOpen={isDropdownOpen}
                        setIsDropdownOpen={setIsDropdownOpen}
                       
                    />
                )}
            </div>
        </header>
    );
};

export default Header;