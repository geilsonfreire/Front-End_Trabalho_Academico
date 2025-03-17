// Import Bibliotecas
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// Import Images


// Import CSS
import "../style/home.css";

// Import Components
import Menu from "../components/menu";
import Header from "../components/header";
import Loading from '../components/loading';

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // 1000ms de carregamento

        return () => clearTimeout(timer); // Limpa o timeout se o componente desmontar
    }, []);

    if (loading) {
        return <Loading />; // Exibe o componente de carregamento
    }

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
