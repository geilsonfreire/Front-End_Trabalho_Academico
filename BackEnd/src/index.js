// import Bibliotecas
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // Middleware para logging de requisições

// Import Components
const routes = require('./Routes/routes');

const app = express();
require('./config/db');

// Middleware para logging de requisições
app.use(morgan('dev'));

// Configurações do CORS
app.use(cors({
    origin: '*', // Permite que qualquer domínio acesse a API
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

app.use(express.json());
app.use('/api', routes);

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Ocorreu um erro interno no servidor.', error: err.message });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});