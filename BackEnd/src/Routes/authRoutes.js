const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para login
router.post('/login', authController.login);

// Rota para verificar autenticação
router.get('/check', authController.checkAuth);

// Rota para obter o usuário
router.get('/user', authController.getUser);

module.exports = router;