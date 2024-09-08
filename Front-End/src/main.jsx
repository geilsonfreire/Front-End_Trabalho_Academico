// Import Bibliotecas
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';


// Import Componentes
import App from './App.jsx'

// Import CSS
import './style/root.css'
import 'react-toastify/dist/ReactToastify.css';
import './style/customToast.css'; // Customização do Toast

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <Router>
            <App />
            <ToastContainer className="custom-toast" />
        </Router>
    </AuthProvider>
)