// src/api/produtoApi.js
const API_BASE_URL = 'http://localhost:3000/api/produtos'; // Ajuste a URL conforme necessário

// Função para obter todos os produtos
export const fetchProdutos = async () => {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error('Erro ao buscar produtos.');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Função para obter um produto por ID
export const fetchProdutoById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar produto.');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Função para adicionar um novo produto
export const createProduto = async (produto) => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        });
        if (!response.ok) {
            throw new Error('Erro ao criar produto.');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Função para atualizar um produto existente
export const updateProduto = async (id, produto) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        });
        if (!response.ok) {
            throw new Error('Erro ao atualizar produto.');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Função para deletar um produto
export const deleteProduto = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Erro ao deletar produto.');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}