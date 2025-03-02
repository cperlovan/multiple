const Condominium = require('../models/Condominium');

// Obtener todos los condominios
exports.getAllCondominiums = async (req, res) => {
  try {
    const condominiums = await Condominium.findAll();
    res.status(200).json(condominiums);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los condominios', error });
  }
};

// Crear un nuevo condominio
exports.createCondominium = async (req, res) => {
  const { name, towerId } = req.body;

  try {
    const newCondominium = await Condominium.create({ name, towerId });
    res.status(201).json({ message: 'Condominio creado exitosamente', condominium: newCondominium });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el condominio', error });
  }
};