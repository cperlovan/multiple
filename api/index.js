// Import the Express app from app.js
const app = require('./app');

// For Vercel deployment, we need to export a function that handles requests
module.exports = (req, res) => {
  // This is a hack to make Express work with Vercel serverless functions
  return app(req, res);
}; 