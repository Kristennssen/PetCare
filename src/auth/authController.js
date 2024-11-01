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
    console.error(error)
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
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await prisma.sesion.create({
      data: {
        usuarioId: user.id,
        token,
      },
    });
    res.json({ token });
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error logging in' });
  }
};

module.exports = {
  register,
  login,
};