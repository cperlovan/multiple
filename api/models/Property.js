const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Property = sequelize.define('Property', {
  type: {
    type: DataTypes.ENUM('apartment', 'house', 'local', 'warehouse'),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  details: {
    type: DataTypes.JSONB, // Para almacenar detalles específicos (piso, calle, sector, etc.)
    allowNull: true,
  },
  participationQuota: {
    type: DataTypes.DECIMAL(5, 2), // Porcentaje de participación (ejemplo: 15.50%)
    allowNull: false,
    defaultValue: 0.0,
  },
  condominiumId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Condominiums',
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Nombre de la tabla relacionada
      key: 'id',      // Clave primaria de la tabla relacionada
    },
  },
});

module.exports = Property;