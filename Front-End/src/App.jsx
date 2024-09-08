// Import Bibliotecas
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Import Componentes
import MyRoutes from './routes/MyRoutes'

// Import CSS
import './style/global.css'

const App = () => {
    const location = useLocation();

    // Salva a URL atual no localStorage sempre que a página mudar
    useEffect(() => {
        localStorage.setItem('lastVisitedPage', location.pathname);
    }, [location]);


    return (
        <MyRoutes />
    )
}

export default App