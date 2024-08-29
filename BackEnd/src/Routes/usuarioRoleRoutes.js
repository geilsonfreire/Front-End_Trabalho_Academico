const express = require('express');
const router = express.Router();
const usuarioRoleController = require('../controllers/usuarioRoleController');

router.post('/usuarios/:id_usuario/roles/:id_role', usuarioRoleController.associateUsuarioRole);
router.get('/usuarios/:id_usuario/roles', usuarioRoleController.getRolesByUsuario);
router.delete('/usuarios/:id_usuario/roles/:id_role', usuarioRoleController.deleteUsuarioRole);

module.exports = router;