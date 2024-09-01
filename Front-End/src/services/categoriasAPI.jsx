import axios from 'axios';

export const addCategoria = async (categoria) => {
    try {
        const response = await axios.post('http://localhost:3000/api/categorias', categoria, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao adicionar categoria:', error.response ? error.response.data : error.message);
        throw error;
    }
};
