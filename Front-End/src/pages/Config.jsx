// Importação de Bibliotecas

// Import Icons 
import { 
    MdHome, 
    MdEditNotifications, 
    MdOutlineSecurity, 
    MdDeleteForever 
} from "react-icons/md";
import { FaUserCog } from "react-icons/fa";

// Importação de CSS
import "../style/Config.css";

const Configuracoes = () => {

    return (
        <div className="ConfiguracoesContainer">
            <aside className="ConfiguracoesMenu">
                <ul>
                    <li><i><MdHome /></i>Geral</li>
                    <li><i><FaUserCog /></i>Usuários</li>
                    <li><i><MdEditNotifications  /></i>Notificações</li>
                    <li><i><MdOutlineSecurity  /></i>Segurança</li>
                </ul>
            </aside>

            <section className="ConfiguracoesConteudo">
                <h2>Gerenciamento de Usuários</h2>
                <table className="TabelaUsuarios">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Senha</th>
                            <th>Status</th>
                            <th>Papel</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={""}>
                            <td>{"user.nome"}</td>
                            <td>{"user.email"}</td>
                            <td>{"user.senha"}</td>
                            <td>
                                <select

                                    onChange={""}
                                >
                                    <option value="ADM">Ativo</option>
                                    <option value="Operador">Inativo</option>
                                </select>
                            </td>
                            <td>
                                <select
                                    
                                    onChange={""}
                                >
                                    <option value="ADM">ADM</option>
                                    <option value="Operador">Operador</option>
                                </select>
                            </td>
                            <td>
                                <button
                                    className="DeleteBtn"
                                    onClick={""}
                                >
                                    <MdDeleteForever />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Configuracoes;