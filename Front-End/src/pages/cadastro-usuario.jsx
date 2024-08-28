// Import Biblioteca
// import { useState, useEffect } from "react";

// Import CSS
import "../style/cadastro_usuario.css";

// Import Image, Icons
import { 
    BsFillPersonFill,
    BsFillEnvelopeAtFill,
    BsFillUnlockFill,
} from "react-icons/bs";

const Cadastro_Usuario = () => {

    return (
        <main className="RegisterContainer">
            <section className="RegisterConatinerRight">
                <div className="EntradaRegister">
                    <div className="RegisterHeader">
                        <span>Cadastro</span>
                    </div>


                    <form className="FormRegister">

                        <div className="InputWithIcon">
                            <BsFillPersonFill className="InputIcon" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Nome"
                                value={""}
                                onChange={""}
                            />
                        </div>

                        <div className="InputWithIcon">
                            <BsFillEnvelopeAtFill className="InputIcon" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Adicione seu e-mail"
                                value={""}
                                onChange={""}
                            />
                        </div>

                        <div className="InputWithIcon">
                            <BsFillUnlockFill className="InputIcon" />
                            <input
                                type={""}
                                name="password"
                                placeholder="Criar senha"
                                value={""}
                                onChange={""}
                            />
                        </div>

                        <div className="InputWithIcon">
                            <BsFillUnlockFill className="InputIcon" />
                            <input
                                type={""}
                                name="confirmPassword"
                                placeholder="Confirme sua senha"
                                value={''}
                                onChange={''}
                            />
                        </div>

                        <div className="CheckBox-cadastra-usuario">
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
                </div>
            </section>

        </main>
    );

}


export default Cadastro_Usuario; // Export the component