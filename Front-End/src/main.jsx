// Import Bibliotecas
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';

// Import Componentes
import App from './App.jsx'

// Import CSS
import './style/root.css'
import 'react-toastify/dist/ReactToastify.css';
import './style/customToast.css'; // Customização do Toast

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
        <ToastContainer className="custom-toast" />
    </React.StrictMode>,
)
