// Import Bibliotecas
import axios from "axios";

const API_BASE_URL = 'http://localhost:3000/api/produtos';

// Função auxiliar para lidar com erros de resposta
const handleResponse = async (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.data.message || 'Erro ao processar a requisição.');
    }
};

// Função para obter o token JWT
const getToken = () => localStorage.getItem('token');

// Função para obter todos os produtos com filtros
export const fetchProdutos = async (queryString = '') => {
    try {
        const response = await axios.get(`${API_BASE_URL}?${queryString}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
        });
        console.log('Dados dos produtos recebidos:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        throw error;
    }
};


// Função para obter um produto por ID
export const fetchProdutoById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Erro ao buscar produto por ID:', error);
        throw error;
    }
};

// Função para adicionar um novo produto
export const createProduto = async (produto) => {
    try {
        const response = await axios.post(API_BASE_URL, produto, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        throw error;
    }
};

// Função para atualizar um produto existente
export const updateProduto = async (id, produto) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, produto, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        throw error;
    }
};

// Função para deletar um produto
export const deleteProduto = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
        });
        await handleResponse(response);
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        throw error;
    }
};