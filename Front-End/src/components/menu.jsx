// Import Bibliotecas
import { useEffect } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Import icon, img assets
import Logo from "../assets/img/logo.png";

// Import CSS
import "../style/menu.css";

// Import icon
import {
    MdSpaceDashboard,
    MdGridView,
    MdOutlineForum,
    MdChecklist,
    MdOutlineGridOn,
    MdSettings,
    MdLogout,
    MdCalendarMonth,
} from "react-icons/md";

const Menu = () => {

    useEffect(() => {
        const mainMenuLi = document.getElementById("mainMenu").querySelectorAll("li");

        function changeActive() { /* função para mudar a classe active */
            mainMenuLi.forEach(n => n.classList.remove("active")); /* removendo a classe active */
            this.classList.add("active"); /* adicionando a classe active */
        }
        mainMenuLi.forEach((n) => n.addEventListener("click", changeActive)); /* adicionando evento de click */
    }, []);


  return (
      <nav className="Menu-lateral">
          <Link to="/admin">
              <img src={Logo} alt="Logo da pagina" />
          </Link>

          <ul id="mainMenu">
              <Icon
                  to="/admin/adminDashBoard"
                  icon={<MdSpaceDashboard />}
                  title="DashBoard"
              />
              <Icon
                  to="/admin/adminProducts"
                  icon={<MdGridView />}
                  title="Produtos"
              />
              <Icon to="#" icon={<MdChecklist />} title="Pedidos" />
              <Icon to="#" icon={<MdOutlineGridOn />} title="Estoques" />
              <Icon to="#" icon={<MdOutlineForum />} title="Mensagens" />
              <Icon to="#" icon={<MdCalendarMonth />} title="Agendas" />
          </ul>
          <hr />
          <ul className="lasttMenu">
              <Icon to="#" icon={<MdSettings />} title="Configurações" />
              <Icon to="#" icon={<MdLogout />} title="Sair" />
          </ul>
      </nav>
  )
}

const Icon = ({ to, icon, title, onClick }) => ( // Icon component
    <li>
        <Link to={to} title={title} onClick={onClick} >
            {icon}
            <span className="icon-text">{title}</span>
        </Link>
    </li>
);

Icon.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Menu
