const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/PaymentController');

// Crear un nuevo pago
router.post('/', paymentController.createPayment);

// Obtener todos los pagos de un recibo específico
router.get('/receipt/:receiptId', paymentController.getPaymentsByReceipt);

// Obtener todos los pagos de un condominio específico
router.get('/condominium/:condominiumId', paymentController.getPaymentsByCondominium);

module.exports = router;