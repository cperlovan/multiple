const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  const { name, email, password, role, towerId } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role, towerId });
    res.status(201).json({ message: 'Usuario registrado exitosamente.', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario.', error });
  }
};