import { createContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(); // Cria o contexto de autenticação

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sessionExpired, setSessionExpired] = useState(false);
    const navigate = useNavigate();

    // Função centralizada para definir o estado de autenticação
    const setAuthState = useCallback(({ token, user, isAuthenticated, expiresIn }) => {
        const now = new Date().getTime(); // Obtém a data atual em milissegundos
        if (token) {
            // Armazena o token no localStorage
            localStorage.setItem('token', token);
            // Armazena a data de expiração do token
            localStorage.setItem('tokenExpires', now + expiresIn * 1000);

            // Configura um timeout para verificar a expiração do token
            setTimeout(() => {
                const tokenExpires = localStorage.getItem('tokenExpires');
                const currentTime = new Date().getTime();
                if (tokenExpires && currentTime >= tokenExpires) {
                    toast.warn('Sua sessão expirou. Por favor, faça login novamente.');
                    setSessionExpired(true);
                    // Redireciona o usuário para a página de login
                    navigate('/login');
                }
            }, expiresIn * 1000); // Verifica após o tempo de expiração
        } else {
            // Remove o token se não houver autenticação
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpires');
        }

        // Atualiza os estados de autenticação e usuário
        setIsAuthenticated(isAuthenticated);
        setUser(user);
    }, [navigate]);

    // Função para verificar a expiração do token
    const checkTokenExpiration = useCallback(() => {
        const token = localStorage.getItem('token');
        const tokenExpiry = localStorage.getItem('tokenExpires');
        const now = new Date().getTime();

        if (!token || now > tokenExpiry) {
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpires');
            setAuthState({
                token: null,
                user: null,
                isAuthenticated: false,
            });
            setSessionExpired(true);
            toast.warn('Sua sessão expirou. Por favor, faça login novamente.');
            navigate('/'); // Redireciona usando React Router
        } else {
            setSessionExpired(false);
        }
    }, [navigate, setAuthState]);

    // Função de login
    const login = async (emailOrUsername, password) => {
        try {
            // Faz a requisição de login
            const response = await axios.post('https://backendtrabalhoacademico-production.up.railway.app/api/auth/login', { emailOrUsername, senha: password });

            const { token, user, expiresIn } = response.data; // Extrai o token e o usuário da resposta

            // Atualiza o estado de autenticação, salva o token e os dados do usuário
            setAuthState({
                token,
                user,
                isAuthenticated: true,
                expiresIn: expiresIn || 3600, // Define o tempo de expiração (1h por padrão)
            });

            setSessionExpired(false);

            // Redireciona para a última página visitada
            const lastVisitedPage = localStorage.getItem('lastVisitedPage') || '/admin';
            navigate(lastVisitedPage);

        } catch (error) {
            console.error("Erro de login:", error);
            // Se ocorrer um erro, reseta o estado de autenticação
            setAuthState({
                token: null,
                user: null,
                isAuthenticated: false,
            });
            throw error.response?.data?.message || 'Falha ao autenticar';
        }
    };

    // Verifica o estado de autenticação ao carregar o componente
    const checkAuth = useCallback(async () => {
        try {
            // Verifica a expiração do token
            checkTokenExpiration();

            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get('https://backendtrabalhoacademico-production.up.railway.app/api/auth/check', {
                    headers: { Authorization: `Bearer ${token}` }
                }); // Faz a requisição para verificar o token


                if (response.data.isAuthenticated) {
                    // Atualiza o estado se a autenticação for válida
                    setAuthState({
                        token,
                        user: response.data.decoded,  // Dados do usuário decodificados do token
                        isAuthenticated: true,
                    });
                } else {
                    // Se o token for inválido, reseta o estado e remove o token
                    setAuthState({
                        token: null,
                        user: null,
                        isAuthenticated: false,
                    });
                }
            } else {
                // Se não houver token no localStorage, reseta o estado
                setAuthState({
                    token: null,
                    user: null,
                    isAuthenticated: false,
                });
            }
        } catch (error) {
            console.error("Erro de autenticação:", error);
            // Em caso de erro, reseta o estado e remove o token
            setAuthState({
                token: null,
                user: null,
                isAuthenticated: false,
            });
        } finally {
            setLoading(false);
        }
    }, [checkTokenExpiration, setAuthState]);

    useEffect(() => {
        checkAuth();// Executa a função de verificação de autenticação
    }, [checkAuth]);


    // Função de logout
    const logout = () => {
        setAuthState({
            token: null,
            user: null,
            isAuthenticated: false,
        });
        navigate('/'); 
    };

    //  Retorna o contexto de autenticação
    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            checkTokenExpiration, 
            sessionExpired, 
            user, 
            login, 
            checkAuth, 
            logout, 
            loading 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Adiciona a validação de props
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;