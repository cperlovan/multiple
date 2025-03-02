const Property = require('../models/Property');

// Crear una nueva propiedad
exports.createProperty = async (req, res) => {
  const { type, name, details, condominiumId } = req.body;
  const { userId } = req; // Obtener el ID del usuario autenticado desde el middleware de autenticación
  console.log(condominiumId)
  try {
    const property = await Property.create({
      type,
      name,
      details,
      condominiumId,
      userId, // Asociar la propiedad al usuario autenticado
    });

    res.status(201).json({ message: 'Propiedad registrada exitosamente.', property });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar la propiedad.', error });
  }
};

// Obtener todas las propiedades de un condominio específico
exports.getPropertiesByCondominium = async (req, res) => {
  const { condominiumId } = req.params;

  try {
    const properties = await Property.findAll({
      where: { condominiumId },
      include: [
        {
          model: require('../models/User'), // Incluir información del usuario
          attributes: ['id', 'name', 'email'], // Seleccionar solo los campos necesarios
        },
      ],
    });

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las propiedades.', error });
  }
};

