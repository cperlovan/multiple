const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/SupplierController');
const auth = require('../middleware/auth');

// Ruta GET para obtener todos los proveedores
router.get('/', supplierController.getAllSuppliers);

// Ruta POST para crear un proveedor (solo administradores)
router.post('/', auth, (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'superadmin')) {
    next();
  } else {
    res.status(403).json({ 
      message: 'No autorizado. Solo administradores y superadmins pueden crear proveedores.' 
    });
  }
}, supplierController.createSupplier);

router.get("/condominium/:condominiumId",auth,supplierController.getSuppliersByCondominium);
router.get("/:supplierId/activities", auth, supplierController.getActivitiesBySupplier);

router.post('/complete-profile', auth, supplierController.completeProfile);

router.put('/:supplierId', auth, supplierController.updateSupplier);
router.delete('/:supplierId', auth, supplierController.deleteSupplier);

router.get('/user/:userId', auth, supplierController.getSupplierByUserId);

module.exports = router;