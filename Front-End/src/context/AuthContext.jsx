import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Verifica o estado de autenticação ao carregar o componente
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('http://localhost:3000/api/auth/check', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (response.data.isAuthenticated) {
                        setIsAuthenticated(true);
                        setUser(response.data.user);
                    } else {
                        localStorage.removeItem('token');
                        setIsAuthenticated(false);
                        setUser(null);
                    }
                }
            } catch (error) {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                setUser(null);
            }
        };

        checkAuth();
    }, []);

    // Função de login
    const login = async (emailOrUsername, password) => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { emailOrUsername, senha: password });
            const { token, user } = response.data;

            // Armazena o token
            localStorage.setItem('token', token);

            // Atualiza o estado de autenticação e usuário
            setIsAuthenticated(true);
            setUser(user);  // O backend já retornou os dados do usuário no login

        } catch (error) {
            console.error("Erro de login:", error);
            setIsAuthenticated(false);
            setUser(null);
            throw error.response?.data?.message || 'Falha ao autenticar';
        }
    };

    // Função de logout
    const logout = () => {
        // Remove o token e limpa o estado de autenticação
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
    };

    //  Retorna o contexto de autenticação
    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Adiciona a validação de props
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;