const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const produtoValidation = require('../Validations/produtoVadalidation'); 
const { validate } = require('express-validator');

router.post('/', produtoValidation, produtoController.createProduto);
router.get('/', produtoController.getProdutos);
router.get('/:id', produtoController.getProdutoById);
router.put('/:id', produtoValidation, produtoController.updateProduto);
router.delete('/:id', produtoController.deleteProduto);

module.exports = router;
