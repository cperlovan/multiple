const express = require('express');
const router = express.Router();
const { getAllCondominiums, createCondominium } = require('../controllers/CondominiumController');

// Obtener todos los condominios
router.get('/', getAllCondominiums);

// Crear un nuevo condominio
router.post('/', createCondominium);

module.exports = router;