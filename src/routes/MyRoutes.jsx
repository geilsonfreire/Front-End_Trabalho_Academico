// Import Bibliotecas
import { Route, Routes } from "react-router-dom";

// Import Componentes
import Login from "../pages/Login.jsx";
import Home from '../pages/home.jsx';
import CadastroUsuario from "../pages/cadastro-usuario.jsx";
import AdminProducts from "../pages/adminProducts.jsx";
import AdminDashBoard from "../pages/AdminDashBoard.jsx";
import MovimentacaoEstoque from "../pages/MovimentacaoEstoque.jsx";
import Config from "../pages/Config.jsx";
import ProtectedRoute from './ProtectedRoute';
import RoleProtectedRoute from './RoleProtectedRoute';


function MyRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/admin" element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
            }>
                <Route index element={
                    <RoleProtectedRoute role="Administrador">
                        <AdminDashBoard />
                    </RoleProtectedRoute>
                } />
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