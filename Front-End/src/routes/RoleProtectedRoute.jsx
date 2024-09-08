import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../context/AuthContext.jsx';

function RoleProtectedRoute({ children, role }) {
    const { user } = useContext(AuthContext); // Obtém o usuário do contexto
    console.log('Usuário (RoleProtectedRoute):', user);

    if (!user || !user.roles || !user.roles.includes(role)) { // Se não houver usuário ou o usuário não tiver a role
        console.log('Role ou usuario nao encontrado => página de login...');
        return <Navigate to="/" replace />; // Redireciona para a página de login
    }

    return children;
}

RoleProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    role: PropTypes.string.isRequired,
};

export default RoleProtectedRoute;