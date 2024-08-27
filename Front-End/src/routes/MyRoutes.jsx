// Import Bibliotecas
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import Componentes
import Home from '../pages/home.jsx';
import AdminProducts from "../pages/adminProducts.jsx";
import AdminDashBoard from "../pages/AdminDashBoard.jsx";



function MyRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<Home />}>
                    <Route path="/admin/adminDashBoard" element={<AdminDashBoard />} />
                    <Route path="/admin/adminProducts" element={<AdminProducts />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default MyRoutes