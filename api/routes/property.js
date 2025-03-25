const express = require('express');
const router = express.Router();
const {
  createProperty,
  getPropertiesByCondominium,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require('../controllers/PropertyController');


const { checkCondominiumAccess } = require('../middleware/condominiumAccess');

// 1. Crear una nueva propiedad
router.post('/', checkCondominiumAccess, createProperty);

// 2. Obtener todas las propiedades de un condominio específico
router.get('/condominium/:condominiumId', checkCondominiumAccess,  getPropertiesByCondominium);

// 3. Obtener una propiedad específica por su ID
router.get('/:propertyId', getPropertyById);

// 4. Actualizar una propiedad existente
router.put('/:propertyId', checkCondominiumAccess, updateProperty);

// 5. Eliminar una propiedad de forma lógica
router.delete('/:propertyId', checkCondominiumAccess, deleteProperty);



module.exports = router;