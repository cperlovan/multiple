const Supplier = require('../models/Supplier');

// Crear un nuevo proveedor
exports.createSupplier = async (req, res) => {
  const { name, type, contactInfo, condominiumId } = req.body;

  try {
    const supplier = await Supplier.create({ name, type, contactInfo, condominiumId });
    res.status(201).json({ message: 'Proveedor registrado exitosamente.', supplier });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el proveedor.', error });
  }
};

// Obtener todos los proveedores de un condominio específico
exports.getSuppliersByCondominium = async (req, res) => {
  const { condominiumId } = req.params;

  try {
    const suppliers = await Supplier.findAll({ where: { condominiumId } });
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los proveedores.', error });
  }
};