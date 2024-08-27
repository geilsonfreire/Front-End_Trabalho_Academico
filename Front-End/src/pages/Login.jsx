// Import Bibliotecas
// import { useState, useEffect, useContext } from "react"; // Import React
// import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import { Link} from 'react-router-dom'; 

// Import CSS
import "../style/Login.css";

// Import Biblioteca
import { BsArrowRight, BsFillUnlockFill, BsFillPersonFill } from "react-icons/bs";

// Create a functional component called Login
const Login = () => {
    // Create a constant called auth
    /* const [email, setEmail] = useState(''); // Create a constant called email
    const [password, setPassword] = useState(''); // Create a constant called password
    const [showPassword, setShowPassword] = useState(false); // State to manage show/hide password
    const navigate = useNavigate(); // Estado e navegaçao entre pages
    const [loading, setLoading] = useState(false); */


    /*  // Função para verificar se o e-mail já está cadastrado
     const checkIfEmailExists = async () => {
         try {
             
         } catch (error) {
             console.error("Erro na checagem do email", error); // Apresentar erro no console
             return false; // Retorna false para indicar que houve um erro ao verificar o e-mail
         }
     }; */


    /* // funçao para autenticar um usuário com email e senha
    const handleSignIn = async (e) => {
        e.preventDefault(); // previnir o comportamento padrão da página

        if (!email || !password) {
            showAlert("Por favor, preencha todos os campos!");
            return;
        }  // Verifica se o e-mail e a senha foram fornecidos


        setLoading(true); // Definir estado de loading como true
        const emailExists = await checkIfEmailExists(); // Verificar se o email fornecido ja esta cadastrado
        if (!emailExists) {  // Verificar se o email nao esta cadastrado
            setLoading(false); // Dasativa o estado de carregamento
            showAlert("E-mail ou senha inválidos!"); // Apresentar alerta
        } if (emailExists) { // Se o email existir 
            await signInWithEmailAndPassword(email, password);  // Tenta autenticar o usuário com o e-mail e senha fornecidos
            setLoading(false); // Desativar o carregamento 
            return;
        }

        try {
            await signInWithEmailAndPassword(email, password);  // Tenta autenticar o usuário com o e-mail e senha fornecidos
            if (auth.currentUser) {
                if (!auth.currentUser.emailVerified) {
                    throw new Error("Verifique seu e-mail antes de login! \nVerifique na sua caixa de entrada e sua pasta de spam ou lixeira eletrônica. ");
                } else {
                    navigate("/Home"); // Redirecionar o usuario para o Home 
                }
            }
        } catch (error) {
            setLoading(false); // Deasativar o carregamento
            showAlert("Erro ao fazer login, tente novamente mais tarde!" + error.message); // Apresentar alerta de erro ao efetuar o login
            console.error("Erro ao fazer login:", error); // Apresentar erro no console
        } finally {
            setLoading(false);  // Garante que o estado de carregamento seja desativado mesmo que ocorra uma exceção
        }

    }; */


    // Function to handle show/hide password
    /*  const handleShowPassword = () => {
         setShowPassword(!showPassword);
     } // Mostra ou oculta a senha */

    /*  const handleResetPassword = async () => {
         if (!email) {
             showAlert("Por favor, insira seu e-mail!");
             return;
         } // Verifica se o e-mail foi fornecido
         try {
             await sendPasswordResetEmail(auth, email); // Enviar e-mail de redefinição de senha
             showAlert("E-mail de redefinição de senha enviado com sucesso!"); // Apresentar alerta
         } catch (error) {
             console.error("Erro ao enviar e-mail de redefinição de senha:", error); // Apresentar erro no console
             showAlert("Erro ao enviar e-mail de redefinição de senha, tente novamente mais tarde!"); // Apresentar alerta de erro
         }
     } */

    return (
        <main className="LoginContainer">

            <section className="LoginContainerLeft">
                <img src={""} alt="Nft Login" />
            </section>

            <section className="LoginConatinerRight">
                <div className="EntradaLogin">
                    <div className="LoginHeader">
                        <span>Login</span>
                    </div>

                    <form className="FormLogin">

                        <div className="InputWithIcon">
                            <BsFillPersonFill className="InputIcon" />
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Usuario com e-mail"
                                onChange={""}
                            />
                        </div>

                        <div className="InputWithIcon">
                            <BsFillUnlockFill className="InputIcon" />
                            <input
                                id="password"
                                type={""}
                                name="password"
                                placeholder="Senha"
                                onChange={''}
                            />
                        </div>
                        <div className="CheckBox">
                            <input
                                type="checkbox"
                                id="showPassword"
                                checked={""}
                                onChange={""}
                            />
                            <label htmlFor="showPassword">Mostrar senha</label>
                        </div>

                    </form>

                    <a className="EsqueseuSenha" href="#"
                        onClick={""}>Esqueceu sua senha?
                    </a>
                    <button
                        className="BtnLogin"
                        type="submit"
                        onClick={""}
                    >
                        Entrar <i><BsArrowRight /></i>
                    </button>

                    <div className="Divider">
                        <span className="DividerLine"></span>
                        <span className="DividerText">ou</span>
                        <span className="DividerLine"></span>
                    </div>

                    <div className="LoginFooter">
                        <span>Ainda não tem conta?</span>
                        <Link
                            to="/Register">Criar uma conta
                        </Link>
                    </div>

                </div>
            </section>

        </main>
    );

}


export default Login; // Export the component