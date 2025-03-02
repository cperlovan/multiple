const express = require('express');
const router = express.Router();
const receiptController = require('../controllers/ReceiptController');

// Crear un nuevo recibo
router.post('/', receiptController.createReceipt);

// Obtener todos los recibos de un usuario específico
router.get('/user/:userId', receiptController.getReceiptsByUser);

// Obtener todos los recibos de un condominio específico
router.get('/condominium/:condominiumId', receiptController.getReceiptsByCondominium);

router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Servidor funcionando correctamente.' });
  });

module.exports = router;