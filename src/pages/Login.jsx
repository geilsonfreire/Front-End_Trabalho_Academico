/* eslint-disable no-unused-vars */
// Import Bibliotecas
import { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';

// Import de Componentes
import AuthContext from '../context/AuthContext';


// Import CSS
import "../style/Login.css";

// Import icons,
import {
    BsFillPersonFill
} from "react-icons/bs";

// Create a functional component called Login
const Login = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { isAuthenticated, login } = useContext(AuthContext);
    const navigate = useNavigate();

    // Redireciona se já estiver autenticado
    useEffect(() => {
        if (isAuthenticated) { // Se estiver autenticado
            navigate('/admin'); // Redireciona para a página de administrador
        } else {
            navigate('/'); // Redireciona para a página de login
        }
    }, [isAuthenticated, navigate]); 


    const handleLogin = async (event) => {
        event.preventDefault(); // Previne o comportamento padrão de recarregar a página

        if (!emailOrUsername || !password) {
            toast.error('Por favor, preencha todos os campos.');
            return;
        }

        if (password.length < 6) {
            toast.error('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        try {
            await login(emailOrUsername, password); // Usa a função login do AuthContext
            toast.success('Logado com sucesso!');
        } catch (error) {
            toast.error('Erro na autenticação. Verifique suas credenciais.');
        }
    };


    return (
        <main className="LoginContainer">
            {/* Left */}
            <section className="LoginContainerLeft">
            </section>

            {/* Right */}
            <section className="LoginContainerRight">
                <div className="EntradaLogin">
                    <div className="LoginHeader">
                        <span>Login</span>
                    </div>

                    <form className="FormLogin" onSubmit={handleLogin}>
                        <div className="InputWithIcon">
                            <BsFillPersonFill className="InputIcon" />
                            <input
                                type="text"
                                placeholder="Usuário ou E-mail"
                                value={emailOrUsername}
                                onChange={(e) => setEmailOrUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="InputWithIcon">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="CheckBox">
                            <a className="EsqueseuSenha" href="#" onClick={(e) => {
                                e.preventDefault(); // Evita o comportamento padrão de seguir o link
                                toast.info('Funcionalidade de recuperação de senha não implementada.');
                            }}>
                                Esqueceu sua senha?
                            </a>
                        </div>

                        <button
                            className="BtnLogin"
                            type="submit"
                        >
                            Entrar
                        </button>

                        <div className="Divider">
                            <span className="DividerLine"></span>
                            <span className="DividerText">ou</span>
                            <span className="DividerLine"></span>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );

}


export default Login;