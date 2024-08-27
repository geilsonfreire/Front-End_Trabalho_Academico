// Import Biblioteca
// import { useState, useEffect } from "react";
import { Link} from 'react-router-dom'; // Importing react-router-dom

// Import CSS
import "../style/Register.css";

// Import Image, Icons
/// import nftlogin from "../../../Assets/imgs/nftlogin.jpg"; // Import Image from "nftlogin.jpg
// import { BsArrowRight, BsFillUnlockFill, BsFillPersonFill, BsFillEnvelopeAtFill } from "react-icons/bs";

// Create a function component called Login
const Register = () => {
    // Create a constant called auth
    /* const [name, setName] = useState(''); // Estado para gerenciar o nome
    const [email, setEmail] = useState(''); // Create a constant called email
    const [password, setPassword] = useState(''); // Create a constant called password
    const [confirmPassword, setConfirmPassword] = useState(''); // Create a constant called password
    const [showPassword, setShowPassword] = useState(false); // State to manage show/hide password
    const navigate = useNavigate(); // useNavigate hook for navigation
    const [isRegistering, setIsRegistering] = useState(false); // State to manage registration loading */


   /*  // Altera nome da página
    const location = useLocation(); // Create a constant called location
    useEffect(() => {
        document.title = "Register - NFT Colletion"; // Altera o título da página
    }, [location]); */


    /*  // Funçao para verificar se formato do email e valido
     const isEmailValid = (email) => {
         // Retorna o resultado do método test() aplicado à expressão regular
         // A expressão regular valida o formato de um endereço de email
         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
         // ^[^\s@]+  - Inicia com um ou mais caracteres que não sejam espaço ou '@'
         // @         - Seguido de um símbolo '@'
         // [^\s@]+   - Seguido por um ou mais caracteres que não sejam espaço ou '@'
         // \.        - Seguido de um ponto literal '.'
         // [^\s@]+$  - Termina com um ou mais caracteres que não sejam espaço ou '@'
     } */

    /* // Function to handle show/hide password
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    } // Mostra ou oculta a senha */

    return (
        <main className="RegisterContainer">

            <section className="RegisterContainerLeft">
                <img src={""} alt="Nft Login" />
            </section>

            <section className="RegisterConatinerRight">
                <div className="EntradaRegister">
                    <div className="RegisterHeader">
                        <span>Cadastro</span>
                    </div>


                    <form className="FormRegister">

                        <div className="InputWithIcon">
                           {/*  <BsFillPersonFill className="InputIcon" /> */}
                            <input
                                type="text"
                                name="name"
                                placeholder="Nome"
                                value={""}
                                onChange={""}
                            />
                        </div>

                        <div className="InputWithIcon">
                            {/* <BsFillEnvelopeAtFill className="InputIcon" /> */}
                            <input
                                type="email"
                                name="email"
                                placeholder="Adicione seu e-mail"
                                value={""}
                                onChange={""}
                            />
                        </div>

                        <div className="InputWithIcon">
                            {/* <BsFillUnlockFill className="InputIcon" /> */}
                            <input
                                type={""}
                                name="password"
                                placeholder="Criar senha"
                                value={""}
                                onChange={""}
                            />
                        </div>

                        <div className="InputWithIcon">
                            {/* <BsFillUnlockFill className="InputIcon" /> */}
                            <input
                                type={""}
                                name="confirmPassword"
                                placeholder="Confirme sua senha"
                                value={''}
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

                    <button
                        className="BtnRegister"
                        type="button"
                        onClick={""}
                        disabled={""}
                    >
                        Cadastrar
                    </button>

                    <div className="Divider">
                        <span className="DividerLine"></span>
                        <span className="DividerText">ou</span>
                        <span className="DividerLine"></span>
                    </div>

                    <div className="RegisterFooter">
                        <span>Já possue uma conta?</span>
                        <Link to="/">Login aqui!</Link>
                    </div>

                </div>
            </section>

        </main>
    );

}


export default Register; // Export the component