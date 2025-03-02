const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Receipt = sequelize.define('Receipt', {
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid'),
    defaultValue: 'pending',
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  pending_amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0, // Inicialmente igual al monto total del recibo
  },
  credit_balance: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0, // Crédito acumulado por pagos en exceso
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
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

module.exports = Receipt;