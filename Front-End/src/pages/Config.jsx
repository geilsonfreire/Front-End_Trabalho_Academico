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

// Mapeamento de papéis de usuário
const roleMapping = {
    1: "Administrador",
    2: "Operador"
};


const Configuracoes = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [changes, setChanges] = useState({});

    // Função para carregar os usuários
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await getUsuarios();
                
                setUsuarios(data);
            } catch (error) {
                toast.error('Erro ao carregar usuários');
            }
        };
        fetchUsuarios();
    }, []);

    // Função para ativar o modo de edição para um usuário
    const handleEditClick = (id) => {
        setEditingUserId(id);
        const user = usuarios.find(user => user.id_usuario === id);
        setChanges(prevChanges => ({
            ...prevChanges,
            [id]: {
                isActive: user.status,
                roles: user.roles || []
            }
        }));
    };


    // Função para salvar as alterações
    const handleSaveClick = async (id) => {
        try {

            // Mapear o papel selecionado para o ID correspondente
            const roleId = Object.keys(roleMapping).find(key => roleMapping[key] === changes[id]?.roles[0]);

            // Verifique se os papéis são enviados como um array de IDs e convertido para número
            const roles = roleId ? [parseInt(roleId, 10)] : [];
            const usuarioData = {
                ...changes[id],
                roles
            };


            // Atualizar o usuário no backend
            await atualizarUsuario(id, usuarioData);

            // Atualizar a lista de usuários localmente no front-end
            setUsuarios(usuarios.map(user =>
                user.id_usuario === id ? { ...user, roles: changes[id]?.roles, ...changes[id] } : user
            ));

            setEditingUserId(null);
            toast.success("Alterações salvas com sucesso!");
        } catch (error) {
            toast.error("Erro ao salvar alterações.");
        }
    };


    // Função para alterar o status localmente (apenas no estado, não salva ainda)
    const handleStatusChange = (id, newStatus) => {
        setChanges(prevChanges => ({
            ...prevChanges,
            [id]: {
                ...prevChanges[id],
                isActive: newStatus
            }
        }));
    };

    // Função para alterar o papel localmente (apenas no estado, não salva ainda)
    const handleRoleChange = (id, newRole) => {
        // Atualizando estado com o ID do papel
        setChanges(prevChanges => ({
            ...prevChanges,
            [id]: {
                ...prevChanges[id],
                roles: [newRole] // Atualizando para o ID correto
            }
        }));
    };

    // Função para deletar um usuário
    const handleDelete = async (id) => {
        try {
            await deletarUsuario(id);
            setUsuarios(usuarios.filter(user => user.id_usuario !== id));
            toast.success('Usuário deletado com sucesso');
        } catch (error) {
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
                                    <tr key={user.id_usuario}>
                                        <td>{user.nome}</td>
                                        <td>{user.email}</td>
                                        <td>{user.senha}</td>
                                        <td>
                                            <select
                                                value={changes[user.id_usuario]?.isActive ?? user.status}
                                                onChange={(e) => handleStatusChange(user.id_usuario, e.target.value)}
                                                disabled={editingUserId !== user.id_usuario}

                                            >
                                                <option value={true}>Ativo</option>
                                                <option value={false}>Inativo</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                value={(changes[user.id_usuario]?.roles[0] ?? user.roles[0]) || ''}
                                                onChange={(e) => {
                                                    const newRole = e.target.value;
                                                    handleRoleChange(user.id_usuario, newRole);
                                                }}
                                                disabled={editingUserId !== user.id_usuario}
                                            >
                                                {Object.entries(roleMapping).map(([roleId, roleName]) => (
                                                    <option key={roleId} value={roleName}>
                                                        {roleName} {/* Exibe o nome do papel */}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="btn-user">
                                            {editingUserId === user.id_usuario ? (
                                                <>
                                                    <button
                                                        className="btn SaveBtn"
                                                        onClick={() => handleSaveClick(user.id_usuario)}
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
                                                        onClick={() => handleEditClick(user.id_usuario)}
                                                    >
                                                        <MdEdit />
                                                    </button>
                                                    <button
                                                        className="btn DeleteBtn"
                                                        onClick={() => handleDelete(user.id_usuario)}
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