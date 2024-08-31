// src/services/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api', // Certifique-se de que este é o caminho correto
    timeout: 10000,
});

export default axiosInstance;