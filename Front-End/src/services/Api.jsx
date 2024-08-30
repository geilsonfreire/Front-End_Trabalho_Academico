import axios from 'axios';

// Configurar a URL base da API
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Funções para realizar requisições à API

// Categorias
export const getCategorias = () => api.get('/categorias');
export const createCategoria = (data) => api.post('/categorias', data);
export const updateCategoria = (id, data) => api.put(`/categorias/${id}`, data);
export const deleteCategoria = (id) => api.delete(`/categorias/${id}`);

// Produtos
export const getProdutos = () => api.get('/produtos');
export const createProduto = (data) => api.post('/produtos', data);
export const updateProduto = (id, data) => api.put(`/produtos/${id}`, data);
export const deleteProduto = (id) => api.delete(`/produtos/${id}`);

// Estoques
export const getEstoques = () => api.get('/estoques');
export const createEstoque = (data) => api.post('/estoques', data);
export const updateEstoque = (id, data) => api.put(`/estoques/${id}`, data);
export const deleteEstoque = (id) => api.delete(`/estoques/${id}`);

// Movimentações
export const getMovimentacoes = () => api.get('/movimentacoes');
export const createMovimentacao = (data) => api.post('/movimentacoes', data);
export const updateMovimentacao = (id, data) => api.put(`/movimentacoes/${id}`, data);
export const deleteMovimentacao = (id) => api.delete(`/movimentacoes/${id}`);

// Usuários
export const getUsuarios = () => api.get('/usuarios');
export const createUsuario = (data) => api.post('/usuarios', data);
export const updateUsuario = (id, data) => api.put(`/usuarios/${id}`, data);
export const deleteUsuario = (id) => api.delete(`/usuarios/${id}`);

// Roles
export const getRoles = () => api.get('/roles');
export const createRole = (data) => api.post('/roles', data);
export const updateRole = (id, data) => api.put(`/roles/${id}`, data);
export const deleteRole = (id) => api.delete(`/roles/${id}`);

// Associação de Usuário e Role
export const getRolesByUsuario = (id) => api.get(`/usuarios-roles/${id}`);
export const associateUsuarioRole = (data) => api.post('/usuarios-roles', data);
export const deleteUsuarioRole = (id_usuario, id_role) => api.delete(`/usuarios-roles`, { data: { id_usuario, id_role } });

export default api;
