// Import Bibliotecas
// import { useState, useEffect, useContext } from "react"; // Import React
// import { Link, useLocation, useNavigate } from 'react-router-dom'; 


// Import CSS
import "../style/Login.css";

// Import icons, imgs
import Banner from "../assets/img/banner.jpg";
import {
    BsFillUnlockFill,
    BsFillPersonFill
} from "react-icons/bs";

// Create a functional component called Login
const Login = () => {
    return (
        <main className="LoginContainer">

            <section className="LoginContainerLeft">
                <img src={Banner} alt="Nft Login" />
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
                                placeholder="Usuario ou E-mail"
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
                            <div className="input-checkbox">
                                <input
                                    type="checkbox"
                                    id="showPassword"
                                    checked={""}
                                    onChange={""}
                                />
                                <label htmlFor="showPassword">Mostrar senha</label>
                            </div>
                            <a className="EsqueseuSenha" href="#"
                                onClick={""}>Esqueceu sua senha?
                            </a>
                        </div>

                    </form>


                    <button
                        className="BtnLogin"
                        type="submit"
                        onClick={""}
                    >
                        Entrar
                    </button>

                    <div className="Divider">
                        <span className="DividerLine"></span>
                        <span className="DividerText">ou</span>
                        <span className="DividerLine"></span>
                    </div>
                </div>
            </section>

        </main>
    );

}


export default Login;