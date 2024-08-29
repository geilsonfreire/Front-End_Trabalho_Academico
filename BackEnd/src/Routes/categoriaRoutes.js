const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const { createCategoriaValidator, updateCategoriaValidator } = require('../Validations/categoriaValidation');

router.post('/', createCategoriaValidator, categoriaController.createCategoria);
router.get('/', categoriaController.getCategorias);
router.get('/:id', categoriaController.getCategoriaById);
router.put('/:id', updateCategoriaValidator, categoriaController.updateCategoria);
router.delete('/:id', categoriaController.deleteCategoria);

module.exports = router;