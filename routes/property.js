const express = require('express');
const router = express.Router();
const { createProperty, getPropertiesByCondominium } = require('../controllers/PropertyController');

// Crear una nueva propiedad
router.post('/', createProperty);

// Obtener todas las propiedades de un condominio específico
router.get('/condominium/:condominiumId', getPropertiesByCondominium);




module.exports = router;