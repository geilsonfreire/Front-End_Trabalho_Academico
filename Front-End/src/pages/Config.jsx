// Importação de Bibliotecas
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Import Icons 
import {
    MdEditNotifications,
    MdOutlineSecurity,
    MdDeleteForever,
    MdEdit,
    MdSave,
} from "react-icons/md";
import { FaUserCog } from "react-icons/fa";

// Importação de CSS
import "../style/Config.css";

// Importação dos Serviços de API
import { getUsuarios, atualizarUsuario, deletarUsuario } from "../services/userAPI";

const Configuracoes = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null); 
    const [changes, setChanges] = useState({});

    // Função para atualizar o status do usuário
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await getUsuarios();
                setUsuarios(data);
            } catch (error) {
                console.error("Erro ao obter usuarios", error);
                toast.error('Erro ao carregar usuários');
            }
        };
        fetchUsuarios();
    }, []);

    // Função para ativar o modo de edição para um usuário
    const handleEditClick = (id) => {
        setEditingUserId(id);
        setChanges(prevChanges => ({
            ...prevChanges,
            [id]: {
                isActive: usuarios.find(user => user.id === id).isActive,
                role: usuarios.find(user => user.id === id).role
            }
        }));
    };

    // Função para salvar as alterações
    const handleSaveClick = async (id) => {
        try {
            await atualizarUsuario(id, changes[id]);
            setUsuarios(usuarios.map(user =>
                user.id === id ? { ...user, ...changes[id] } : user
            ));
            setEditingUserId(null);
            toast.success("Alterações salvas com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar alterações", error);
            toast.error("Erro ao salvar alterações.");
        }
    };


    // Função para atualizar o status do usuário
    const handleStatusChange = async (id, newStatus) => {
        try {
            await atualizarUsuario(id, { isActive: newStatus });
            setUsuarios(usuarios.map(user =>
                user.id === id ? { ...user, isActive: newStatus } : user
            ));
            toast.success("Status atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
            toast.error("Erro ao atualizar status.");
        }
    };

    // Função para atualizar o papel do usuário
    const handleRoleChange = async (id, newRole) => {
        try {
            await atualizarUsuario(id, { role: newRole });
            setUsuarios(usuarios.map(user =>
                user.id === id ? { ...user, role: newRole } : user
            ));
            toast.success('Papel do usuário atualizado com sucesso');
        } catch (error) {
            console.error("Erro ao atualizar papel do usuário", error);
            toast.error('Erro ao atualizar papel do usuário');
        }
    };

    // Função para deletar um usuário
    const handleDelete = async (id) => {
        try {
            await deletarUsuario(id);
            setUsuarios(usuarios.filter(user => user.id !== id));
            toast.success('Usuário deletado com sucesso');
        } catch (error) {
            console.error("Erro ao deletar usuário", error);
            toast.error('Erro ao deletar usuário');
        }
    };


    return (
        <main>
            <div className="ConfiguracoesContainer">
                <aside className="ConfiguracoesMenu">
                    <ul>
                        <li><i><FaUserCog /></i>Usuários</li>
                        <li><i><MdEditNotifications /></i>Notificações</li>
                        <li><i><MdOutlineSecurity /></i>Segurança</li>
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
                            {usuarios && usuarios.length > 0 ? (
                                usuarios.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.nome}</td>
                                        <td>{user.email}</td>
                                        <td>{user.senha}</td>
                                        <td>
                                            <select
                                                value={changes[user.id]?.isActive ?? user.isActive}
                                                onChange={(e) => handleStatusChange(user.id, e.target.value)}
                                                disabled={editingUserId !== user.id}
                                            >
                                                <option value={true}>Ativo</option>
                                                <option value={false}>Inativo</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                value={changes[user.id]?.role ?? user.role}
                                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                disabled={editingUserId !== user.id}
                                            >
                                                <option value="ADM">Administrador</option>
                                                <option value="Operador">Operador</option>
                                            </select>
                                        </td>
                                        <td className="btn-user">
                                            {editingUserId === user.id ? (
                                                <>
                                                    <button
                                                        className="btn SaveBtn"
                                                        onClick={() => handleSaveClick(user.id)}
                                                    >
                                                        <MdSave />
                                                    </button>
                                                    <button
                                                        className="btn CancelBtn"
                                                        onClick={() => setEditingUserId(null)}
                                                    >
                                                        Cancelar
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        className="btn EditBtn"
                                                        onClick={() => handleEditClick(user.id)}
                                                    >
                                                        <MdEdit />
                                                    </button>
                                                    <button
                                                        className="btn DeleteBtn"
                                                        onClick={() => handleDelete(user.id)}
                                                    >
                                                        <MdDeleteForever />
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">Nenhum usuário encontrado</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            </div>
        </main>
    );
};

export default Configuracoes;