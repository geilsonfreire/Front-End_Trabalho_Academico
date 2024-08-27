const { Router } = require('express');
const fetchAndSaveAll = require('../controllers/syncDataAll');
const fetchAndSaveLatest = require('../controllers/syncDataAll');
const getLotofacilAllMydb = require('../controllers/getAllMydb');
const getLotofacilLatestMydb = require('../controllers/getLatestMydb');

const routes = Router();

routes.get('/', (req, res) => {
    return res.json({
        message: 'Hello World'
    });
});

// Rotas ara sincronizar todos os resultados da Lotofacil
routes.get('/getLotofacilAll', async (req, res) => {
    console.log('Acessado os dados... ');
    try {
        await fetchAndSaveAll();
        return res.json({ message: 'Todos os resultados da Lotofacil foram salvos com sucesso!' });
    } catch (error) {
        console.error('Erro ao sincronizar os dados:', error);
        return res.status(500).json({ message: 'Erro ao salvar os resultados da Lotofacil: ', error });
    }
});

// Rota para sincronizar o último resultado da Lotofácil
routes.get('/getLotofacilLatest', async (req, res) => {
    console.log('Iniciando a sincronização do último resultado... ');
    try {
        await fetchAndSaveLatest();
        return res.json({ message: 'O último resultado da Lotofácil foi salvo com sucesso!' });
    } catch (error) {
        console.error('Erro ao sincronizar o último resultado:', error);
        return res.status(500).json({ message: 'Erro ao salvar o último resultado da Lotofácil', error: error.message });
    }
});

// Rota para obter resultados do banco de dados
routes.get('/getLotofacilAllMydb', getLotofacilAllMydb);

// Rota para obter o último resultado da Lotofácil do banco de dados
routes.get('/getLotofacilLatestMydb', getLotofacilLatestMydb);

module.exports = routes;