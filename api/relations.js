const User = require('./models/User');
const Condominium = require('./models/Condominium');
const Property = require('./models/Property');
const Receipt = require('./models/Receipt');
const Payment = require('./models/Payment');
const Supplier = require('./models/Supplier');
const EconomicActivity = require('./models/EconomicActivity');
const BankAccount = require('./models/BankAccount');
const ReserveFund = require('./models/ReserveFund');
const Expense = require('./models/Expense');
const SupplierEconomicActivity = require('./models/SupplierEconomicActivity');
const ReserveFundContribution = require('./models/ReserveFundContribution');

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



// Relaciones entre Condominium y BankAccount
Condominium.hasMany(BankAccount, { foreignKey: 'condominiumId' });
BankAccount.belongsTo(Condominium, { foreignKey: 'condominiumId' });

// Relaciones entre Condominium y ReserveFund
Condominium.hasMany(ReserveFund, { foreignKey: 'condominiumId' });
ReserveFund.belongsTo(Condominium, { foreignKey: 'condominiumId' });


// Relación entre Condominium y Expense
Condominium.hasMany(Expense, { foreignKey: 'condominiumId' });
Expense.belongsTo(Condominium, { foreignKey: 'condominiumId' });

// Relación entre Supplier y Expense
Supplier.hasMany(Expense, { foreignKey: 'supplierId' });
Expense.belongsTo(Supplier, { foreignKey: 'supplierId' });

// Relación entre Condominium y Property
Condominium.hasMany(Property, { foreignKey: 'condominiumId' });
Property.belongsTo(Condominium, { foreignKey: 'condominiumId' });


// Relación muchos a muchos entre Supplier y EconomicActivity
    Supplier.belongsToMany(EconomicActivity, {
    through: SupplierEconomicActivity, // Usa el modelo explícito
    foreignKey: 'supplierId', // Nombre explícito de la clave foránea
    otherKey: 'economicActivityId', // Clave foránea para EconomicActivity
  });
  
  EconomicActivity.belongsToMany(Supplier, {
    through: SupplierEconomicActivity, // Usa el modelo explícito
    foreignKey: 'economicActivityId', // Nombre explícito de la clave foránea
    otherKey: 'supplierId', // Clave foránea para Supplier
  });


// Relación entre User y Supplier
User.hasOne(Supplier, { foreignKey: 'userId' });
Supplier.belongsTo(User, { foreignKey: 'userId' }); 

// Relación entre ReserveFund y ReserveFundContribution
ReserveFund.hasMany(ReserveFundContribution, { foreignKey: 'reserveFundId' });
ReserveFundContribution.belongsTo(ReserveFund, { foreignKey: 'reserveFundId' });

