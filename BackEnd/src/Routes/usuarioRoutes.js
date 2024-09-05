const express = require('express');
const router = express.Router();
const { createUsuario, getUsuarios, getUsuarioById, updateUsuario, deleteUsuario } = require('../controllers/usuarioController');

// Rota pública para criar um novo usuário
router.post('/', createUsuario);

// Rotas protegidas para outras operações de usuário no index.js
router.get('/', getUsuarios); // Listar todos os usuários (opcional)
router.get('/:id', getUsuarioById); // Obter um usuário por ID
router.put('/:id', updateUsuario); // Atualizar um usuário por ID
router.delete('/:id', deleteUsuario); // Deletar um usuário por ID

module.exports = router;