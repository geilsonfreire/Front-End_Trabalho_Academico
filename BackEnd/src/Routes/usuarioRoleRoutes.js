const express = require('express');
const router = express.Router();
const usuarioRoleController = require('../controllers/usuarioRoleController');

router.post('/:id_usuario/roles/:id_role', usuarioRoleController.associateUsuarioRole);
router.get('/:id_usuario/roles', usuarioRoleController.getRolesByUsuario);
router.delete('/:id_usuario/roles/:id_role', usuarioRoleController.deleteUsuarioRole);

module.exports = router;