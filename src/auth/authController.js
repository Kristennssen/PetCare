const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../../prisma/prisma.js');

const register = async (req, res) => {
  const { correo, contrasena, empleadoId } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const newUser = await prisma.usuario.create({
      data: {
        correo,
        contrasena: hashedPassword,
        empleadoId,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering user' });
  }
};
const login = async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    const user = await prisma.usuario.findUnique({
      where: { correo },
    });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Verifica si ya existe una sesión activa para el usuario
    await prisma.sesion.upsert({
      where: { usuarioId: user.id },
      update: { token }, // Actualiza el token si ya existe una sesión
      create: {
        usuarioId: user.id,
        token, // Crea una nueva sesión si no existe
      },
    });

    console.log('Token generated:', token);
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
};

module.exports = {
  register,
  login,
};