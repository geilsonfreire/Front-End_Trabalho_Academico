const express = require('express');
const router = express.Router();
const movimentacaoEstoqueController = require('../controllers/movimentacaoEstoqueController');

router.post('/movimentacoes', movimentacaoEstoqueController.createMovimentacaoEstoque);
router.get('/movimentacoes', movimentacaoEstoqueController.getMovimentacoesEstoque);
router.get('/movimentacoes/:id', movimentacaoEstoqueController.getMovimentacaoEstoqueById);
router.put('/movimentacoes/:id', movimentacaoEstoqueController.updateMovimentacaoEstoque);
router.delete('/movimentacoes/:id', movimentacaoEstoqueController.deleteMovimentacaoEstoque);

module.exports = router;