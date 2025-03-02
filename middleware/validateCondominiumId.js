const Condominium = require('../models/Condominium');

const validateCondominiumId = async (req, res, next) => {
  const { condominiumId } = req.body;
  console.log(condominiumId)

  try {
    const condominium = await Condominium.findByPk(condominiumId);
    if (!condominium) {
      return res.status(400).json({ message: 'El condominio especificado no existe.' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error al validar el condominio.', error });
  }
};

module.exports = validateCondominiumId;