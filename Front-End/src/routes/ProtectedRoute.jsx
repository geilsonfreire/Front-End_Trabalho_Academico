import { useContext,useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import AuthContext from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation(); // Para acessar a página atual
    const { isAuthenticated, sessionExpired, checkTokenExpiration } = useContext(AuthContext); // Obtém o estado de autenticação do contexto

    // Efeito para lidar com a expiração da sessão
    useEffect(() => {
        if (sessionExpired) {
            toast.error('Sua sessão expirou. Faça login novamente.');
            navigate('/'); // Redireciona para a página de login
        }
    }, [sessionExpired, navigate]);

    // Efeito para verificar a expiração do token e redirecionar para a última página visitada
    useEffect(() => {
        checkTokenExpiration(); // Verifica a expiração do token

        // Se o usuário estiver autenticado e a página atual for a raiz
        if (isAuthenticated && location.pathname === '/') {
            const lastVisitedPage = localStorage.getItem('lastVisitedPage');
            if (lastVisitedPage) {
                navigate(lastVisitedPage, { replace: true });
            } else {
                // Caso não tenha página visitada armazenada, redireciona para `/admin`
                navigate('/admin', { replace: true });
            }
        }

        // Atualiza a última página visitada no localStorage
        localStorage.setItem('lastVisitedPage', location.pathname);

    }, [isAuthenticated, location, navigate, checkTokenExpiration]);

    if (!isAuthenticated) {// Se não estiver autenticado
        return <Navigate to="/" replace />; // Redireciona para a página de login
    }
    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;