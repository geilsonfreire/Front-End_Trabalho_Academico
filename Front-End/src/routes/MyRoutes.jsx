// Import Bibliotecas
import { Route, Routes } from "react-router-dom";

// Import Componentes
import Login from "../pages/Login.jsx"
import Home from '../pages/home.jsx';
import Cadastro_usuario from "../pages/cadastro-usuario.jsx"
import AdminProducts from "../pages/adminProducts.jsx";
import AdminDashBoard from "../pages/AdminDashBoard.jsx";
import MovimentacaoEstoque from "../pages/MovimentacaoEstoque.jsx";
import Config from "../pages/Config.jsx";



function MyRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<Home />}>
                <Route path="/admin/adminDashBoard" element={<AdminDashBoard />} />
                <Route path="/admin/adminEstoques" element={<AdminProducts />} />
                <Route path="/admin/adminCadastroUsuarios" element={<Cadastro_usuario />} />
                <Route path="/admin/adminMovimentacaoEstoque" element={<MovimentacaoEstoque />} />
                <Route path="/admin/adminConfig" element={<Config />} />
            </Route>
        </Routes>
    )
}

export default MyRoutes