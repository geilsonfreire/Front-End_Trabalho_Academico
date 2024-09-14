// Import Biblioteca
import { useState, useRef } from "react";
import {toast } from "react-toastify";

// Import CSS
import "../style/cadastro_usuario.css";

// Import Componenetes
import { cadastrarUsuario } from "../services/userAPI";

// Import Image, Icons
import {
    BsFillPersonFill,
    BsFillEnvelopeAtFill,
} from "react-icons/bs";

const Cadastro_Usuario = () => {
    const [showPassword] = useState(false); 
    const [isLoading, setIsLoading] = useState(false);
    const nameInputRef = useRef(null);

    // Estado para armazenar os dados do usuário
    const [usuarioData, setUsuarioData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        isActive: true,
        role: "Operador",
    }); // Estado para armazenar os dados do usuário


    // Função para lidar com a mudança de valores nos inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUsuarioData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Função para lidar com a mudança de valores nos checkboxes
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setUsuarioData((prevData) => ({
            ...prevData,
            [name]: checked,
        }));
    };

    // Função de validação de campos
    const validateForm = () => {
        if (!usuarioData.name || !usuarioData.email || !usuarioData.password) {
            toast.error("Todos os campos são obrigatórios.");
            return false;
        }

        if (usuarioData.password.length < 6) {
            toast.error("A senha deve ter pelo menos 6 caracteres.");
            return false;
        }

        if (usuarioData.password !== usuarioData.confirmPassword) {
            toast.error("As senhas não coincidem.");
            return false;
        }

        return true;
    };

    // Função para lidar com a submissão do formulário
    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            await cadastrarUsuario({
                nome: usuarioData.name,
                email: usuarioData.email,
                senha: usuarioData.password,
                isActive: usuarioData.isActive,
                id_role: usuarioData.role === "Operador" ? 2 : 1,
            });

            toast.success("Usuário cadastrado com sucesso!");
            // Limpar campos e focar no campo "Nome"
            setUsuarioData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                isActive: true,
                role: "Operador",
            });
            // Verifique se nameInputRef está disponível antes de chamar focus
            if (nameInputRef.current) {
                nameInputRef.current.focus(); // Focar no campo "Nome"
            }
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);

            if (error?.response?.status === 409) {
                toast.error("E-mail já cadastrado.");
            } else {
                toast.error("Erro ao cadastrar usuário.");
            }
        } finally {
            setIsLoading(false);
        }
    };


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
                                onChange={handleInputChange}
                                value={usuarioData.name}
                                ref={nameInputRef}
                            />
                        </div>

                        <div className="InputWithIcon">
                            <BsFillEnvelopeAtFill className="InputIcon" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Adicione seu e-mail"
                                onChange={handleInputChange}
                                value={usuarioData.email}
                            />
                        </div>

                        <div className="InputWithIcon">
                           
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Criar senha"
                                onChange={handleInputChange}
                                value={usuarioData.password}
                            />
                        </div>

                        <div className="InputWithIcon">
                           
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirme sua senha"
                                onChange={handleInputChange}
                                value={usuarioData.confirmPassword}
                            />
                        </div>

                        <div className="container-check">
                            <div className="CheckBox-cadastra-usuario">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    name="isActive"
                                    checked={usuarioData.isActive}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="isActive">Ativo</label>
                            </div>

                            <div className="permision">
                                <label htmlFor="role">Permissões:</label>
                                <select
                                    id="role"
                                    name="role"
                                    value={usuarioData.role}
                                    onChange={handleInputChange}
                                >
                                    <option value="2">Operador</option>
                                    <option value="1">Administrador</option>
                                </select>
                            </div>

                        </div>

                    </form>

                    <button
                        className="BtnRegister"
                        type="button"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? "Cadastrando..." : "Cadastrar"}
                    </button>
                </div>
            </section>

        </main>
    );

}


export default Cadastro_Usuario; 