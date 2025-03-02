const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Supplier = sequelize.define('Supplier', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('individual', 'company'),
      allowNull: false,
    },
    contactInfo: {
      type: DataTypes.JSONB, // Almacena datos como teléfono, correo, dirección, etc.
      allowNull: true,
    },
    condominiumId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Condominiums',
        key: 'id',
      },
    },
  });
  
  module.exports = Supplier;