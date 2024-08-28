// Import Bibliotecas
import { Outlet } from 'react-router-dom';

// Import Images


// Import CSS
import "../style/home.css";

// Import Components
import Menu from "../components/menu";
import Header from "../components/header";


const Home = () => {
    // Renderiza o componente jsx
    return (
        <div className="admin-layout">
            <div className="menu-lateral">
                <Menu />
            </div>
            <div className="admin-main">
                <Header />
                <main id='Fund'>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Home;
