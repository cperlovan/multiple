require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');

// Importar modelos
const User = require('./models/User');
const Condominium = require('./models/Condominium');
const Property = require('./models/Property');



// Importar relaciones
require('./relations'); // Importar el archivo relations.js

// Inicializar Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());


// Rutas
const authRoutes = require('./routes/auth');
const condominiumRoutes = require('./routes/condominium');
const userRoutes = require('./routes/user');
const propertyRoutes = require('./routes/property');
const receiptRoutes = require('./routes/receipt');
const paymentRoutes = require('./routes/payment');

app.use('/api/auth', authRoutes);
app.use('/api/condominiums', condominiumRoutes);
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/receipts', receiptRoutes)
app.use('/api/payments', paymentRoutes)


// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Sincronizar la base de datos y luego iniciar el servidor
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos sincronizada.');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });