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
                                onChange={""}
                            />
                        </div>

                        <div className="InputWithIcon">
                            <BsFillEnvelopeAtFill className="InputIcon" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Adicione seu e-mail"
                                onChange={""}
                            />
                        </div>

                        <div className="InputWithIcon">
                            <BsFillUnlockFill className="InputIcon" />
                            <input
                                type={""}
                                name="password"
                                placeholder="Criar senha"
                                onChange={""}
                            />
                        </div>

                        <div className="InputWithIcon">
                            <BsFillUnlockFill className="InputIcon" />
                            <input
                                type={""}
                                name="confirmPassword"
                                placeholder="Confirme sua senha"
                                onChange={''}
                            />
                        </div>

                        <div className="container-check">
                            <div className="CheckBox-cadastra-usuario">
                                <input
                                    type="checkbox"
                                    id="showPassword"
                                    onChange={""}
                                />
                                <label htmlFor="showPassword">Mostrar senha</label>
                            </div>
                            <div className="CheckBox-cadastra-usuario">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={""}
                                    onChange={""}
                                />
                                <label htmlFor="isActive">Ativo</label>
                            </div>

                            <div className="permision">
                                <label htmlFor="role">Permissões:</label>
                                <select
                                    id="role"
                                    value={""}
                                    onChange={""}
                                >
                                    <option value="ADM">ADM</option>
                                    <option value="Operador">Operador</option>
                                </select>
                            </div>

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


export default Cadastro_Usuario; 