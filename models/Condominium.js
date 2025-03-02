const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definir el modelo Condominium
const Condominium = sequelize.define('Condominium', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('residential', 'commercial', 'industrial'),
    allowNull: false,
  },
  rif: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  numberProperties: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
},
{
  tableName: 'Condominiums', // Especificar explícitamente el nombre de la tabla
  timestamps: true, // Asegúrate de que los campos createdAt y updatedAt estén habilitados
});

// Exportar el modelo
module.exports = Condominium;