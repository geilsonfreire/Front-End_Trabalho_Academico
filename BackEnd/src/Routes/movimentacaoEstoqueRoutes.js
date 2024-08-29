const express = require('express');
const router = express.Router();
const movimentacaoEstoqueController = require('../controllers/movimentacaoEstoqueController');

router.post('/', movimentacaoEstoqueController.createMovimentacaoEstoque);
router.get('/', movimentacaoEstoqueController.getMovimentacoesEstoque);
router.get('/:id', movimentacaoEstoqueController.getMovimentacaoEstoqueById);
router.put('/:id', movimentacaoEstoqueController.updateMovimentacaoEstoque);
router.delete('/:id', movimentacaoEstoqueController.deleteMovimentacaoEstoque);

module.exports = router;