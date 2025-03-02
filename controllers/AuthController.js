const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Registro de usuarios
exports.register = async (req, res) => {
  const { name, email, password, role, condominiumId } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const newUser = await User.create({ name, email, password: hashedPassword, role, condominiumId });
    res.status(201).json({ message: 'Usuario registrado exitosamente.', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario.', error });
  }
};

// Inicio de sesión

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por correo electrónico
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta.' });
    }

    // Generar token JWT con información adicional
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        condominiumId: user.condominiumId, 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Inicio de sesión exitoso.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        condominiumId: user.condominiumId,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión.', error });
  }
};