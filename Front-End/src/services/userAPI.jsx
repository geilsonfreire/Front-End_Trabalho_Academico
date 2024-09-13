import axios from 'axios';

// URL base da API
const API_URL = 'http://localhost:3000/api/usuarios';

// Função para criar um usuário (POST)
export const cadastrarUsuario = async (usuarioData) => {
    try {
        const response = await axios.post(API_URL, usuarioData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Autenticação JWT
            }
        });
        console.log('Usuário criado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar usuário:', error.response.data);
        throw error.response.data;
    }
};

// Função para obter a lista de usuários (GET)
export const getUsuarios = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Autenticação JWT
            }
        });
        const usuarios = response.data.map(user => ({
            id_usuario: user.id,
            nome: user.nome,
            email: user.email,
            senha: user.senha,
            status: user.status,
            roles: user.roles || []
        }));
        console.log('Usuários obtidos com sucesso:', usuarios);
        return usuarios;
    } catch (error) {
        console.error('Erro ao obter usuários:', error.response.data);
        throw error.response?.data || error.message; // Propaga o erro para ser tratado no front-end
    }
};

// Função para atualizar um usuário (PUT)
export const atualizarUsuario = async (id, usuarioData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, usuarioData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Autenticação JWT
            }
        });
        console.log('Usuário atualizado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error.response.data);
        throw error.response.data; // Propaga o erro para ser tratado no front-end
    }
};


// Função para deletar um usuário (DELETE)
export const deletarUsuario = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Autenticação JWT
            }
        });
        console.log('Usuário deletado com sucesso');
    } catch (error) {
        console.error('Erro ao deletar usuário:', error.response.data);
        throw error.response.data; // Propaga o erro para ser tratado no front-end
    }
};
