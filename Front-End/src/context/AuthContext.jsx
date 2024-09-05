import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Verifica o estado de autenticação ao carregar o componente
    useEffect(() => {
        // Verifica o estado de autenticação ao carregar o componente
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
                        // Token inválido ou expirado
                        localStorage.removeItem('token');
                        setIsAuthenticated(false);
                        setUser(null);
                    }
                }
            } catch (error) {
                // Erro ao verificar autenticação
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                setUser(null);
            }
        };

        checkAuth();
    }, []);

    // Função de login
    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
            const { token } = response.data;

            // Armazena o token em algum lugar seguro, como localStorage
            localStorage.setItem('token', token);

            // Atualiza o estado de autenticação
            setIsAuthenticated(true);

            // Fetch e atualize o usuário
            const userResponse = await axios.get('http://localhost:3000/api/auth/user', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(userResponse.data);
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
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