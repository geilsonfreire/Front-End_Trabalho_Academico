// Importar Bibliotecas
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // Middleware para logging de requisições

// Importar Routes
const categoriaRoutes = require('./routes/categoriaRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const estoqueRoutes = require('./routes/estoqueRoutes');
const movimentacaoEstoqueRoutes = require('./Routes/movimentacaoEstoqueRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const roleRoutes = require('./routes/roleRoutes');
const usuarioRoleRoutes = require('./routes/usuarioRoleRoutes');

// Inicializar o aplicativo Express
const app = express();

// Conectar ao banco de dados
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

// Rotas
app.use('/api/categorias', categoriaRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/estoques', estoqueRoutes);
app.use('/api/movimentacoes', movimentacaoEstoqueRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/usuarios-roles', usuarioRoleRoutes);


// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Ocorreu um erro interno no servidor.', error: err.message });
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});