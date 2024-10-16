import axios from 'axios';

const API_BASE_URL = 'https://backendtrabalhoacademico-production.up.railway.app/api/categorias';

// Função para obter o token JWT
const getToken = () => localStorage.getItem('token');

// Função auxiliar para lidar com erros
const handleError = (error) => {
    console.error('Erro:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error;
};

// Função para adicionar uma nova categoria
export const addCategoria = async (categoria) => {
    try {
        const response = await axios.post(API_BASE_URL, categoria, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};


// Função para obter todas as categorias
export const fetchCategorias = async () => {
    try {
        const response = await axios.get(API_BASE_URL, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Função para obter uma categoria por ID
export const fetchCategoriaById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Função para atualizar uma categoria existente
export const updateCategoria = async (id, categoria) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, categoria, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Função para deletar uma categoria
export const deleteCategoria = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        handleError(error);
    }
};