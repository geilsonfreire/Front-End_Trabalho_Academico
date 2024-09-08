import { useContext,useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
    const location = useLocation(); // Para acessar a página atual
    const { isAuthenticated } = useContext(AuthContext); // Obtém o estado de autenticação do contexto
    console.log('Estado de autenticação (ProtectedRoute):', isAuthenticated);

    useEffect(() => {
        const lastVisitedPage = localStorage.getItem('lastVisitedPage');
        if (isAuthenticated && lastVisitedPage && location.pathname === '/') {
            // Se o usuário está autenticado e a página atual é "/", redireciona para a última página visitada
            window.location.href = lastVisitedPage;
        }
    }, [isAuthenticated, location]);

    if (!isAuthenticated) {// Se não estiver autenticado
        console.log('Estado de autenticação (ProtectedRoute):', isAuthenticated);
        console.log('Redirecionando para a página de login...');
        return <Navigate to="/" replace />; // Redireciona para a página de login
    } else {
        console.log('Usuário autenticado. Renderizando children...');
    }
    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;