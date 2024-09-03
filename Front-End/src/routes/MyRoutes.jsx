// Import Bibliotecas
import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from 'react';
import PropTypes from 'prop-types';

// Import Componentes
import AuthContext from '../context/AuthContext.jsx';
import Login from "../pages/Login.jsx";
import Home from '../pages/Home.jsx';
import CadastroUsuario from "../pages/cadastro-usuario.jsx";
import AdminProducts from "../pages/AdminProducts.jsx";
import AdminDashBoard from "../pages/AdminDashBoard.jsx";
import MovimentacaoEstoque from "../pages/MovimentacaoEstoque.jsx";
import Config from "../pages/Config.jsx";

// Componente para rotas protegidas por autenticação
function ProtectedRoute({ children }) {
    // Add prop validation for 'children'
    ProtectedRoute.propTypes = {
        children: PropTypes.node.isRequired,
    };
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />; // Redireciona para a página de login se não autenticado
    }

    return children;
}

// Adicionar validação de propriedades para RoleProtectedRoute
RoleProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    role: PropTypes.string.isRequired,
};

// Componente para rotas protegidas por papel (autorização)
function RoleProtectedRoute({ children, role }) {
    const { user } = useContext(AuthContext);

    if (!user || user.role !== role) {
        return <Navigate to="/" replace />; // Redireciona para a página de login se não autorizado
    }

    return children;
}

function MyRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/admin" element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
            }>
                <Route path="/admin/adminDashBoard" element={
                    <RoleProtectedRoute role="Administrador">
                        <AdminDashBoard />
                    </RoleProtectedRoute>
                } />
                <Route path="/admin/adminEstoques" element={
                    <RoleProtectedRoute role="Administrador">
                        <AdminProducts />
                    </RoleProtectedRoute>
                } />
                <Route path="/admin/adminCadastroUsuarios" element={
                    <RoleProtectedRoute role="Administrador">
                        <CadastroUsuario />
                    </RoleProtectedRoute>
                } />
                <Route path="/admin/adminMovimentacaoEstoque" element={
                    <RoleProtectedRoute role="Administrador">
                        <MovimentacaoEstoque />
                    </RoleProtectedRoute>
                } />
                <Route path="/admin/adminConfig" element={
                    <RoleProtectedRoute role="Administrador">
                        <Config />
                    </RoleProtectedRoute>
                } />
            </Route>
        </Routes>
    );
}

export default MyRoutes;