import axios from 'axios';

const API_URL = 'https://backendtrabalhoacademico-production.up.railway.app/api';

// Função para obter o token JWT
const getToken = () => localStorage.getItem('token');

// Função auxiliar para lidar com erros
const handleError = (error) => {
    console.error('Erro:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error;
};

// Função para buscar categorias
export const fetchCategorias = async () => {
    try {
        const response = await axios.get(`${API_URL}/categorias`, {
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

// Função para buscar tipos de movimentações e datas
export const fetchTiposEDatas = async () => {
    try {
        const response = await axios.get(`${API_URL}/movimentacoes`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            }
        });
        const data = response.data;

        const tiposMovimentacoes = [...new Set(data.map(item => item.tipo_movimentacao))];
        const datasMovimentacoes = [...new Set(data.map(item => item.data_movimentacao))];

        return { tiposMovimentacoes, datasMovimentacoes };
    } catch (error) {
        handleError(error);
    }
};