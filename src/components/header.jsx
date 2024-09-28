// Import Bibliotecas
import { useState, useEffect, useContext } from "react";

// Import CSS
import "../style/header.css";

// Import components
import MenuDropDownPerfil from "../components/MenuDropDownPerfil";
import AuthContext from '../context/AuthContext';

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
    const { user, logout } = useContext(AuthContext);

    const toggleDropdown = () => {
        setIsDropdownOpen(PrevState => !PrevState);
    }; // Alterna o estado de aberto/fechado do dropdown   

    useEffect(() => {
        
    }, [user]);

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
                        <div className="pefill-adim-span">
                            <span
                                className="user-name">
                                {user?.email || ""}
                            </span>
                            <span
                                className="user-type">
                                {user?.roles?.[0] || ""}

                            </span>
                        </div>
                    </div>
                </div>

                <div className="menu-dropdow"
                    onClick={toggleDropdown}

                >
                    <i>
                        {isDropdownOpen ? <MdArrowCircleUp /> : <MdArrowCircleDown />}
                    </i>
                </div>
                {isDropdownOpen && (
                    <MenuDropDownPerfil
                        isDropdownOpen={isDropdownOpen}
                        setIsDropdownOpen={setIsDropdownOpen}
                        logout={logout}
                    />
                )}
            </div>
        </header>
    );
};

export default Header;