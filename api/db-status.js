const sequelize = require('./config/database');

module.exports = async (req, res) => {
  try {
    // Test the database connection
    await sequelize.authenticate();
    
    res.json({
      status: 'success',
      message: 'Database connection established successfully',
      timestamp: new Date().toISOString(),
      database: {
        name: process.env.DB_NAME || 'Not set',
        dialect: sequelize.getDialect(),
        host: process.env.DB_HOST || 'Not set',
        ssl: process.env.DB_SSL === 'true'
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}; 