const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoqueController');

router.post('/estoques', estoqueController.createEstoque);
router.get('/estoques', estoqueController.getEstoques);
router.get('/estoques/:id', estoqueController.getEstoqueById);
router.put('/estoques/:id', estoqueController.updateEstoque);
router.delete('/estoques/:id', estoqueController.deleteEstoque);

module.exports = router;