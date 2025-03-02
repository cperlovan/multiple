const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definir el modelo User
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'copropietario'),
    defaultValue: 'copropietario',
  },
  condominiumId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Condominiums',
      key: 'id',
    },
  },
  credit_balance: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0, // Crédito acumulado por pagos en exceso
  },
});

module.exports = User;