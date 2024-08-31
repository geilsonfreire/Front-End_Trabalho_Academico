// filtroAPI.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const fetchCategorias = async () => {
    try {
        const response = await axios.get(`${API_URL}/categorias`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar categorias: ' + error.message);
    }
};

export const fetchTiposEDatas = async () => {
    try {
        const response = await axios.get(`${API_URL}/movimentacoes`);
        const data = response.data;

        const tiposMovimentacoes = [...new Set(data.map(item => item.tipo_movimentacao))];
        const datasMovimentacoes = [...new Set(data.map(item => item.data_movimentacao))];

        return { tiposMovimentacoes, datasMovimentacoes };
    } catch (error) {
        throw new Error('Erro ao buscar tipos e datas: ' + error.message);
    }
};