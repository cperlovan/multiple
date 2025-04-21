module.exports = (req, res) => {
  res.json({
    message: 'Backend API is working!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    query: req.query,
    method: req.method
  });
}; 