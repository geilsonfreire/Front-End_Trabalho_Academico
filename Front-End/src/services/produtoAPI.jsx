// src/api/produtoApi.js
const API_BASE_URL = 'http://localhost:3000/api/produtos';

// Função auxiliar para lidar com erros de resposta
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao processar a requisição.');
    }
    return await response.json();
};

// Função para obter o token JWT
const getToken = () => localStorage.getItem('token');

// Função para obter todos os produtos
export const fetchProdutos = async () => {
    try {
        const response = await fetch(API_BASE_URL, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        throw error;
    }
};

// Função para obter um produto por ID
export const fetchProdutoById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erro ao buscar produto por ID:', error);
        throw error;
    }
};

// Função para adicionar um novo produto
export const createProduto = async (produto) => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        throw error;
    }
};

// Função para atualizar um produto existente
export const updateProduto = async (id, produto) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        throw error;
    }
};

// Função para deletar um produto
export const deleteProduto = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
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
}