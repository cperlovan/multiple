const Receipt = require('../models/Receipt');

// Crear un nuevo recibo
// Crear un nuevo recibo
exports.createReceipt = async (req, res) => {
  const { amount, dueDate, userId, condominiumId } = req.body;

  try {
    // Validar que todos los campos necesarios estén presentes
    if (!amount || !dueDate || !userId || !condominiumId) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const receipt = await Receipt.create({
      amount,
      dueDate,
      userId,
      condominiumId,
      pending_amount: amount, // Inicializar el saldo pendiente con el monto total
    });
    res.status(201).json({ message: 'Recibo generado exitosamente.', receipt });
  } catch (error) {
    console.error('Error al crear el recibo:', error); // Registrar el error en la consola
    res.status(500).json({ message: 'Error al generar el recibo.', error: error.message });
  }
};

// Obtener todos los recibos de un usuario específico
exports.getReceiptsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const receipts = await Receipt.findAll({
      where: { userId },
      include: [
        {
          model: require('../models/Condominium'), // Incluir información del condominio
          attributes: ['id', 'name'],
        },
      ],
    });
    res.status(200).json(receipts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los recibos.', error });
  }
};

// Obtener todos los recibos de un condominio específico
exports.getReceiptsByCondominium = async (req, res) => {
  const { condominiumId } = req.params;

  try {
    // Validar que condominiumId sea un número válido
    if (!condominiumId || isNaN(condominiumId)) {
      return res.status(400).json({ message: 'El ID del condominio es inválido.' });
    }

    console.log(`Buscando recibos para el condominio con ID: ${condominiumId}`);

    const receipts = await Receipt.findAll({
      where: { condominiumId },
      include: [
        {
          model: require('../models/User'), // Incluir información del usuario
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    console.log(`Recibos encontrados:`, receipts);

    if (receipts.length === 0) {
      return res.status(404).json({ message: 'No se encontraron recibos para este condominio.' });
    }

    res.status(200).json(receipts);
  } catch (error) {
    console.error('Error al obtener los recibos:', error);
    res.status(500).json({ message: 'Error al obtener los recibos.', error: error.message });
  }
};