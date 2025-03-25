require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Agregar cookie-parser
const jwt = require("jsonwebtoken");
const authenticateToken = require('./middleware/authMiddleware');
const validateCondominiumId = require('./middleware/validateCondominiumId');
const superAdminRoutes = require('./routes/superAdminRoutes');

// Inicializar Express
const app = express();

// Configuración de CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware para parsear cookies y JSON
app.use(cookieParser()); // Agregar antes de las rutas
app.use(express.json({ strict: false }));

// Middleware de debug
app.use((req, res, next) => {
  console.log('=== Nueva petición ===');
  console.log('Método:', req.method);
  console.log('Ruta:', req.path);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));

  // Limpiar el body para peticiones GET
  if (req.method === 'GET') {
    delete req.body;
  } else {
    console.log('Body:', req.body);
  }

  console.log('==================');
  next();
});

// Importar modelos
const User = require('./models/User');
const Condominium = require('./models/Condominium');
const Property = require('./models/Property');

// Importar relaciones
require('./relations');

// Importar rutas
const authRoutes = require('./routes/auth');
const condominiumRoutes = require('./routes/condominium');
const userRoutes = require('./routes/user');
const propertyRoutes = require('./routes/property');
const receiptRoutes = require('./routes/receipt');
const paymentRoutes = require('./routes/payment');
const expenseRoutes = require('./routes/expenseRoutes');
const economicActivityRoutes = require('./routes/economicActivity');
const supplierRoutes = require('./routes/supplier');
const bankAccountRoutes = require('./routes/bankAccount');
const reserveFundRoutes = require('./routes/reserveFund');
const reserveFundContributionRoutes = require('./routes/reserveFundContribution');
// Rutas públicas (sin autenticación)
app.use('/api/auth', authRoutes);
app.use('/api/condominium', condominiumRoutes); // Cambiar a singular para que coincida con el frontend

// Rutas protegidas (con autenticación)
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/properties', authenticateToken, propertyRoutes);
app.use('/api/receipts', authenticateToken, receiptRoutes);
app.use('/api/payments', authenticateToken, paymentRoutes);
app.use('/api/economic-activities', authenticateToken, economicActivityRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/bank-accounts', authenticateToken, bankAccountRoutes);
app.use('/api/reserve-funds', authenticateToken, reserveFundRoutes);
app.use('/api/reserve-fund-contributions', authenticateToken, reserveFundContributionRoutes);
app.use('/api/expenses', authenticateToken, expenseRoutes);
// Rutas
app.use('/api/superadmin', superAdminRoutes);

// Lista de rutas públicas
const publicRoutes = [
  "/",
  "/api/auth/login",
  "/api/auth/register",
  "/api/condominium/register-with-admin",
];

// Puerto del servidor
const PORT = process.env.PORT || 3040;

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