const Property = require('../models/Property');


// 1. Crear una nueva propiedad (CREATE)
exports.createProperty = async (req, res) => {
  const { type, name, details, participationQuota, condominiumId } = req.body;
  const userId = req.user.id; 
  const role = req.user.role; 

  try {
    // Validar que todos los campos necesarios estén presentes
    if (!type || !name || !condominiumId || !participationQuota) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }
    // validar los roles autorizados para registrar propiedades
    const allowedRoles = ['copropietario', 'ocupante', 'admin'];
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: 'No tienes permisos para crear las propiedades por condominio.' });
    }

    // Validar que la alícuota sea un número válido entre 0 y 100
    if (isNaN(participationQuota) || participationQuota <= 0 || participationQuota > 100) {
      return res.status(400).json({ message: 'La alícuota debe ser un número entre 0 y 100.' });
    }

    // Crear la propiedad
    const property = await Property.create({
      type,
      name,
      details,
      participationQuota,
      condominiumId,
      userId, // Asociar la propiedad al usuario autenticado
    });

    res.status(201).json({ message: 'Propiedad registrada exitosamente.', property });
  } catch (error) {
    console.error('Error al registrar la propiedad:', error);
    res.status(500).json({ message: 'Error al registrar la propiedad.', error });
  }
};

// 2. Obtener todas las propiedades de un condominio específico (READ)
exports.getPropertiesByCondominium = async (req, res) => {
  const { condominiumId } = req.params;
  const role = req.user.role;

  try {
    // Validar que condominiumId sea un número válido
    if (!condominiumId || isNaN(condominiumId)) {
      return res.status(400).json({ message: 'El ID del condominio es inválido.' });
    }



    // Obtener las propiedades del condominio
    const properties = await Property.findAll({
      where: { condominiumId },
      include: [
        {
          model: require('../models/User'), // Incluir información del usuario
          attributes: ['id', 'name', 'email'], // Seleccionar solo los campos necesarios
        },
      ],
    });

    // validar los roles autorizados para visualizar propiedades
    if (role !== 'copropietario' && role !== 'ocupante' && role !=='admin' ) {
      return res.status(403).json({ message: 'No tienes permisos para visualizar las propiedades por condominio.' });
    }

    if (properties.length === 0) {
      return res.status(404).json({ message: 'No se encontraron propiedades para este condominio.' });
    }

    res.status(200).json(properties);
  } catch (error) {
    console.error('Error al obtener las propiedades:', error);
    res.status(500).json({ message: 'Error al obtener las propiedades.', error });
  }
};

// 3. Obtener una propiedad específica por su ID (READ)
exports.getPropertyById = async (req, res) => {
  const { propertyId } = req.params;
  const role = req.user.role;
  
  try {
    // Validar que propertyId sea un número válido
    if (!propertyId || isNaN(propertyId)) {
      return res.status(400).json({ message: 'El ID de la propiedad es inválido.' });
    }

    // validar los roles autorizados para visualizar propiedades
    if (role === 'copropietario' && role === 'ocupante' && role == 'admin' ) {
      return res.status(403).json({ message: 'No tienes permisos para visualizar las propiedades.' });
    }

    // Buscar la propiedad por su ID
    const property = await Property.findByPk(propertyId, {
      include: [
        {
          model: require('../models/User'), // Incluir información del usuario
          attributes: ['id', 'name', 'email'], // Seleccionar solo los campos necesarios
        },
      ],
    });

    if (!property) {
      return res.status(404).json({ message: 'Propiedad no encontrada.' });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error('Error al obtener la propiedad:', error);
    res.status(500).json({ message: 'Error al obtener la propiedad.', error });
  }
};

// 4. Actualizar una propiedad existente (UPDATE)
exports.updateProperty = async (req, res) => {
  const { propertyId } = req.params;
  const { type, name, details, participationQuota } = req.body;
  const role = req.user.role;

  try {
    // Validar que propertyId sea un número válido
    if (!propertyId || isNaN(propertyId)) {
      return res.status(400).json({ message: 'El ID de la propiedad es inválido.' });
    }

     // validar los roles autorizados para actualizar propiedades
     if (role !== 'copropietario' && role !== 'ocupante' && role !== 'admin' ) {
      return res.status(403).json({ message: 'No tienes permisos para actualizar propiedades.' });
    }

    // Buscar la propiedad por su ID
    const property = await Property.findByPk(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Propiedad no encontrada.' });
    }

    // Validar que la alícuota sea un número válido entre 0 y 100 (si se proporciona)
    if (participationQuota !== undefined && (isNaN(participationQuota) || participationQuota <= 0 || participationQuota > 100)) {
      return res.status(400).json({ message: 'La alícuota debe ser un número entre 0 y 100.' });
    }

    // Actualizar los datos de la propiedad
    await property.update({
      type: type || property.type,
      name: name || property.name,
      details: details || property.details,
      participationQuota: participationQuota || property.participationQuota,
    });

    res.status(200).json({ message: 'Propiedad actualizada exitosamente.', property });
  } catch (error) {
    console.error('Error al actualizar la propiedad:', error);
    res.status(500).json({ message: 'Error al actualizar la propiedad.', error });
  }
};

// 5. Eliminar una propiedad de forma lógica (DELETE)
exports.deleteProperty = async (req, res) => {
  const { propertyId } = req.params;
  const role = req.user.role;
  try {
    // Validar que propertyId sea un número válido
    if (!propertyId || isNaN(propertyId)) {
      return res.status(400).json({ message: 'El ID de la propiedad es inválido.' });
    }

    // Buscar la propiedad por su ID
    const property = await Property.findByPk(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Propiedad no encontrada.' });
    }

    // validar los roles autorizados para eliminar propiedades
    if (role !== 'copropietario' && role !== 'ocupante' && role !== 'admin' ) {
      return res.status(403).json({ message: 'No tienes permisos para actualizar propiedades.' });
    }


    // Eliminar lógicamente la propiedad (actualizando el estado)
    await property.update({ status: 'inactive' });

    res.status(200).json({ message: 'Propiedad eliminada exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar la propiedad:', error);
    res.status(500).json({ message: 'Error al eliminar la propiedad.', error });
  }
};