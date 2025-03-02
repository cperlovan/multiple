const User = require('./models/User');
const Condominium = require('./models/Condominium');
const Property = require('./models/Property');
const Receipt = require('./models/Receipt');
const Payment = require('./models/Payment');

// Relaciones 
Condominium.hasMany(User, { foreignKey: 'condominiumId' });
User.belongsTo(Condominium, { foreignKey: 'condominiumId' });

User.hasMany(Receipt, { foreignKey: 'userId' });
Receipt.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Property, { foreignKey: 'userId' });
Property.belongsTo(User, { foreignKey: 'userId' });

Condominium.hasMany(Receipt, { foreignKey: 'condominiumId' });
Receipt.belongsTo(Condominium, { foreignKey: 'condominiumId' });

Condominium.hasMany(Payment, { foreignKey: 'condominiumId' });
Payment.belongsTo(Condominium, { foreignKey: 'condominiumId' });

User.hasMany(Payment, { foreignKey: 'userId' }); 
Payment.belongsTo(User, { foreignKey: 'userId' });

Receipt.hasOne(Payment, { foreignKey: 'receiptId' });
Payment.belongsTo(Receipt, { foreignKey: 'receiptId' });