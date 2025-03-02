const express = require('express');
const router = express.Router();
const { createSupplier, getSuppliersByCondominium } = require('../controllers/SupplierController');

// Crear un nuevo proveedor
router.post('/', createSupplier);

// Obtener todos los proveedores de un condominio específico
router.get('/condominium/:condominiumId', getSuppliersByCondominium);

module.exports = router;