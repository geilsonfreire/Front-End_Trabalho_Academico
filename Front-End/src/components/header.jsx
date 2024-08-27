// Import Bibliotecas
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Import CSS
import "../style/header.css";

// Import components
import MenuDropDownPerfil from "../components/MenuDropDownPerfil";
import {
    MdOutlineSearch,
    MdNotifications,
    MdArrowCircleDown,
    MdArrowCircleUp
} from "react-icons/md";

const Header = () => {
    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");
    const [setIsLogged] = useState(false);
    const [ setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("usuarios"));

    // Verifica se o usuário está logado e se é um admin
    useEffect(() => {
        if (user.tipo === 2) {
            setIsLogged(true);
            setIsAdmin(true);
            setUserName(user.displayName);
            setUserImage(user.image);
        } else {
            navigate("/");
        }
    }, [user, navigate, setIsAdmin, setIsLogged]);


    // Estado do dropdown icone
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const menuDropDownRef = useRef(null);
    const toggleDropdown = () => {
        setIsDropdownOpen(PrevState => !PrevState);
    }; // Alterna o estado de aberto/fechado do dropdown   
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                menuDropDownRef.current &&
                !menuDropDownRef.current.contains(event.target)
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
                        <img src={userImage} alt="User Profile" />
                        <span className="user-name">{userName.split(" ")[0]} </span>
                    </div>
                    <div className="pefill-adim-tipo">
                        <span className="user-type">Admin</span>
                    </div>
                </div>

                <div className="menu-dropdow"
                    onClick={toggleDropdown} // Alterna o estado de aberto/fechado do dropdown
                    ref={dropdownRef} // Referência para o dropdown
                >
                    <i>
                        {isDropdownOpen ? <MdArrowCircleUp /> : <MdArrowCircleDown />}
                    </i>
                </div>
                {isDropdownOpen && (
                    <MenuDropDownPerfil
                        isDropdownOpen={isDropdownOpen}
                        setIsDropdownOpen={setIsDropdownOpen}
                        ref={menuDropDownRef}
                    />
                )}
            </div>
        </header>
    );
};

export default Header;